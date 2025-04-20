import { useMarketplace } from "../../context/MarketplaceContext";
import { AnchorProvider, BN, Program, web3} from "@coral-xyz/anchor";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PublishPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reward: "",
    difficulty: "medium",
    tags: "",
    deadline: "",
    image: null as File | null,
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
    reward: "",
    tags: "",
    deadline: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

    // Clear the error when user types
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

      // Create preview
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
    };
    let isValid = true;

    if (!formData.title.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    } else if (formData.description.length < 50) {
      errors.description = "Description should be at least 50 characters";
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

  const calculateDaysLeft = (deadline: string): number => {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    const timeDifference = deadlineDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysLeft > 0 ? daysLeft : 0; 
  };

  const wallet = useAnchorWallet();
  const connection = new Connection("https://api.devnet.solana.com", "confirmed"); // Replace with your cluster endpoint
  const programId = new web3.PublicKey("xqoAEhS6WGSpM9PmtbXhk59FK7U8VxFtRmyK7vCRhUN");
  const [commission, setCommission] = useState(null);

  const { addCommission } = useMarketplace();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (!wallet) {
        alert("Please connect your wallet!");
        return;
      }

      const taskData = {
        title: formData.title,
        description: formData.description,
        reward: parseFloat(formData.reward),
        image: null,
        deadline: formData.deadline ? new Date(formData.deadline).getTime() / 1000 : null, 
      }

      const provider = new AnchorProvider(connection, wallet, { preflightCommitment: "confirmed" }); 
      const idl = await Program.fetchIdl(programId, provider);
      if (!idl) {
        throw new Error("IDL not found for the given program ID");
      }
      const program = new Program(idl, provider);

      const userPublicKey = provider.wallet.publicKey;
      const [commissionPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("commission"), userPublicKey.toBuffer()],
        programId
    );

    const rewardBN = new BN(Math.round(taskData.reward * 1_000_000_000));

      try{
      const tx = await program.methods
      .createCommission(
        taskData.title,
        taskData.description,
        rewardBN,
        formData.image,
        formData.deadline
      )
      .accounts({
        user: userPublicKey,
        commission: commissionPDA,
        systemProgram: web3.SystemProgram.programId
      })
      .rpc();

      console.log("Transaction successful:", tx);
    } catch (error) {
      console.error("Transaction failed:", error);
    }

      // addCommission({
      //   id: commissionPDA.toString(),
      //   title: formData.title,
      //   description: formData.description,
      //   reward: parseFloat(formData.reward),
      //   status: "Open",
      //   createdAt: new Date().toISOString(),
      //   daysLeft: calculateDaysLeft(formData.deadline),
      //   participants: 0,
      // });
      // console.log("Commission added to context:", {
      //   id: commissionPDA.toString(),
      //   title: formData.title,
      // });

      navigate("/marketplace");
    } catch (error) {
      console.error("Error publishing task:", error);
      alert("Failed to publish task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchCommission = async() => {
    if (!wallet) {
      console.error("Wallet not connected.");
      return;
    }

    const provider = new AnchorProvider(connection, wallet, { preflightCommitment: "confirmed" });
    const idl = await Program.fetchIdl(programId, provider);
    if (!idl) {
      throw new Error("IDL not found for the given program ID");
    }
    const program = new Program(idl, provider);

    const [commissionPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("commission"), wallet.publicKey.toBuffer()],
      programId
    );

    try {
      const commissionData = await (program.account as any).commission.fetch(commissionPDA);
      console.log("Commission Data:", commissionData);

      setCommission(commissionData); 
    } catch (error) {
      console.error("Failed to fetch commission data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1232] pt-24 px-4 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#4683df] mb-6">
          Publish a New Task
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[#131b3d] rounded-lg p-8 shadow-lg"
        >
          <div className="mb-6">
            <label htmlFor="title" className="block text-lg font-medium mb-2">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full bg-[#0c1429] border border-[#1d2a4d] rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#4683df]"
              placeholder="E.g., Create a responsive landing page"
            />
            {formErrors.title && (
              <p className="mt-1 text-red-400 text-sm">{formErrors.title}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-lg font-medium mb-2"
            >
              Task Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className="w-full bg-[#0c1429] border border-[#1d2a4d] rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#4683df]"
              placeholder="Provide a detailed description of what you need. Include requirements, deliverables, and any specific technologies..."
            ></textarea>
            {formErrors.description && (
              <p className="mt-1 text-red-400 text-sm">
                {formErrors.description}
              </p>
            )}
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
              Task Image (Optional)
            </label>
            <div className="flex items-center">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#1d2a4d] rounded-lg cursor-pointer bg-[#0c1429] hover:bg-[#111936] transition-colors">
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
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
              I agree to escrow {formData.reward || "0"} SOL for this task until
              completion and review
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
                Respond promptly to task-related questions and submissions
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
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#4683df] text-white rounded-lg hover:bg-[#5a9aec] transition-colors flex items-center"
              disabled={isSubmitting}
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
                "Publish Task"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishPage;
