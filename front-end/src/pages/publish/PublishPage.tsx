import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnchorProgram } from "../../hooks/useAnchorProgram";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { BN } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

// Import the generated types
import { Ulbsolve } from "../../../../target/types/ulbsolve";
import { IdlAccounts, Program } from "@project-serum/anchor";

// Define the User type using IdlAccounts
type User = IdlAccounts<Ulbsolve>["user"];

const PublishPage: React.FC = () => {
  const navigate = useNavigate();
  const program = useAnchorProgram() as Program<Ulbsolve> | null;
  const { publicKey, connected } = useWallet();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reward: "",
    difficulty: "medium",
    tags: "",
    deadline: "",
    cancellationFeePercentage: "0", // Default to 0 (no cancellation fee)
    image: null as File | null,
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
    reward: "",
    tags: "",
    deadline: "",
    cancellationFeePercentage: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors = {
      title: "",
      description: "",
      reward: "",
      tags: "",
      deadline: "",
      cancellationFeePercentage: "",
    };
    let isValid = true;

    if (!formData.title.trim()) {
      errors.title = "Title is required";
      isValid = false;
    } else if (formData.title.length > 32) {
      errors.title = "Title must be 32 characters or less";
      isValid = false;
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    } else if (formData.description.length < 50) {
      errors.description = "Description should be at least 50 characters";
      isValid = false;
    } else if (formData.description.length > 1000) {
      errors.description = "Description must be 1000 characters or less";
      isValid = false;
    }

    if (!formData.reward) {
      errors.reward = "Reward is required";
      isValid = false;
    } else if (
      isNaN(parseFloat(formData.reward)) ||
      parseFloat(formData.reward) <= 0
    ) {
      errors.reward = "Reward must be a positive number";
      isValid = false;
    }

    if (!formData.tags.trim()) {
      errors.tags = "At least one tag is required";
      isValid = false;
    }

    if (!formData.deadline) {
      errors.deadline = "Deadline is required";
      isValid = false;
    } else {
      const deadlineDate = new Date(formData.deadline);
      const now = new Date();
      if (deadlineDate <= now) {
        errors.deadline = "Deadline must be in the future";
        isValid = false;
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!connected || !publicKey) {
      setStatusMessage("Please connect your wallet first");
      return;
    }

    if (!validateForm()) {
      return;
    }

    if (!program) {
      setStatusMessage("Program not connected. Please try again later.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("Creating your commission...");

    try {
      console.log("Preparing to submit commission to blockchain:", {
        title: formData.title,
        description: formData.description,
        reward: formData.reward,
        deadline: formData.deadline,
      });

      // 1. Check if user exists
      setStatusMessage("Checking user account...");
      const [userPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("user"), publicKey.toBuffer()],
        program.programId
      );

      let user: User;
      try {
        user = await program.account.user.fetch(userPDA);
        console.log("User account found:", user);
      } catch (error) {
        console.error("User account not found:", error);
        setStatusMessage(
          "User account not found. Please create a profile first."
        );
        setIsSubmitting(false);
        return;
      }

      // 2. Create the commission
      setStatusMessage("Creating commission on blockchain...");
      const [commissionPDA] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("commission"),
          publicKey.toBuffer(),
          new BN(user.createdCommissions.toString()).toArrayLike(Buffer),
        ],
        program.programId
      );

      const rewardLamports = new BN(
        parseFloat(formData.reward) * 1_000_000_000
      );
      const deadlineDate = new Date(formData.deadline);
      const deadlineTimestamp = new BN(
        Math.floor(deadlineDate.getTime() / 1000)
      );

      // Validate cancellation fee percentage
      const cancellationFeePercentage = parseInt(
        formData.cancellationFeePercentage,
        10
      );
      if (
        isNaN(cancellationFeePercentage) ||
        cancellationFeePercentage < 0 ||
        cancellationFeePercentage > 100
      ) {
        setStatusMessage(
          "Cancellation fee percentage must be between 0 and 100."
        );
        setIsSubmitting(false);
        return;
      }

      const tx = await program.methods
        .createCommission(
          formData.title,
          formData.description,
          rewardLamports,
          cancellationFeePercentage, // Add this argument
          null,
          deadlineTimestamp
        )
        .accounts({
          user: userPDA,
          commission: commissionPDA,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log("Commission created successfully! Transaction ID:", tx);
      setStatusMessage(
        `Success! Commission created. Transaction: ${tx.substring(0, 8)}...`
      );

      setTimeout(() => {
        navigate("/marketplace");
      }, 3000);
    } catch (error) {
      console.error("Blockchain error:", error);
      setStatusMessage(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1232] pt-24 px-4 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#4683df] mb-6">
          Publish a New Commission
        </h1>

        {!connected && (
          <div className="mb-6 p-4 bg-amber-900 bg-opacity-30 border-l-4 border-amber-500 rounded">
            <p className="mb-4">
              Please connect your wallet to publish a commission
            </p>
            <div className="flex justify-center">
              <WalletMultiButton />
            </div>
          </div>
        )}

        {statusMessage && (
          <div className="mb-6 p-4 bg-gray-800 border-l-4 border-blue-500 rounded">
            <p className="flex items-center">
              {isSubmitting && (
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {statusMessage}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-[#131b3d] rounded-lg p-8 shadow-lg"
        >
          <div className="mb-6">
            <label htmlFor="title" className="block text-lg font-medium mb-2">
              Commission Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full bg-[#0c1429] border border-[#1d2a4d] rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#4683df]"
              placeholder="E.g., Create a responsive landing page"
              maxLength={32}
              disabled={!connected}
            />
            {formErrors.title && (
              <p className="mt-1 text-red-400 text-sm">{formErrors.title}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              {formData.title.length}/32 characters
            </p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-lg font-medium mb-2"
            >
              Commission Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className="w-full bg-[#0c1429] border border-[#1d2a4d] rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#4683df]"
              placeholder="Provide a detailed description of what you need. Include requirements, deliverables, and any specific technologies..."
              maxLength={1000}
              disabled={!connected}
            ></textarea>
            {formErrors.description && (
              <p className="mt-1 text-red-400 text-sm">
                {formErrors.description}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              {formData.description.length}/1000 characters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="reward"
                className="block text-lg font-medium mb-2"
              >
                Reward (SOL)
              </label>
              <input
                type="text"
                id="reward"
                name="reward"
                value={formData.reward}
                onChange={handleInputChange}
                className="w-full bg-[#0c1429] border border-[#1d2a4d] rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#4683df]"
                placeholder="E.g., 0.5"
                disabled={!connected}
              />
              {formErrors.reward && (
                <p className="mt-1 text-red-400 text-sm">{formErrors.reward}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="difficulty"
                className="block text-lg font-medium mb-2"
              >
                Difficulty
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                className="w-full bg-[#0c1429] border border-[#1d2a4d] rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#4683df]"
                disabled={!connected}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="tags" className="block text-lg font-medium mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full bg-[#0c1429] border border-[#1d2a4d] rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#4683df]"
                placeholder="E.g., React, UI/UX, Frontend"
                disabled={!connected}
              />
              {formErrors.tags && (
                <p className="mt-1 text-red-400 text-sm">{formErrors.tags}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="deadline"
                className="block text-lg font-medium mb-2"
              >
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className="w-full bg-[#0c1429] border border-[#1d2a4d] rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#4683df]"
                min={new Date().toISOString().split("T")[0]}
                disabled={!connected}
              />
              {formErrors.deadline && (
                <p className="mt-1 text-red-400 text-sm">
                  {formErrors.deadline}
                </p>
              )}
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="image" className="block text-lg font-medium mb-2">
              Commission Image (Optional)
            </label>
            <div className="flex items-center">
              <label
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#1d2a4d] rounded-lg ${
                  connected
                    ? "cursor-pointer bg-[#0c1429] hover:bg-[#111936]"
                    : "bg-[#0c1429] opacity-50 cursor-not-allowed"
                } transition-colors`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-20 object-contain"
                    />
                  ) : (
                    <>
                      <svg
                        className="w-8 h-8 mb-2 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="text-sm text-gray-400">
                        <span className="font-medium">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG or GIF (max. 2MB)
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={!connected}
                />
              </label>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <input
              id="terms"
              type="checkbox"
              className="w-4 h-4 bg-[#0c1429] border border-[#1d2a4d] rounded focus:ring-[#4683df]"
              required
              disabled={!connected}
            />
            <label
              htmlFor="terms"
              className={`ml-2 text-sm ${
                connected ? "text-gray-300" : "text-gray-500"
              }`}
            >
              I agree to escrow {formData.reward || "0"} SOL for this commission
              until completion and review
            </label>
          </div>

          <div className="bg-[#0c1429] p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2 text-[#4683df]">
              Publishing Guidelines:
            </h3>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
              <li>
                Be clear and specific about your requirements and deliverables
              </li>
              <li>Set a fair reward based on the task complexity</li>
              <li>
                Respond promptly to commission-related questions and submissions
              </li>
              <li>Review submissions in a timely manner</li>
              <li>Funds will be held in escrow until task completion</li>
            </ul>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="px-6 py-2 bg-[#0c1429] text-gray-300 rounded-lg mr-4 hover:bg-[#1d2a4d] transition-colors"
              onClick={() => navigate("/marketplace")}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2 ${
                connected
                  ? "bg-[#4683df] hover:bg-[#5a9aec]"
                  : "bg-gray-600 cursor-not-allowed"
              } text-white rounded-lg transition-colors flex items-center`}
              disabled={isSubmitting || !connected}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Publishing...
                </>
              ) : (
                "Publish Commission"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishPage;
