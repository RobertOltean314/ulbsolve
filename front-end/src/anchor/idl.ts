export type Ulbsolve = {
  address: "GsdFK1NysJH9XUY7h8qu25Qt8eF6ADD84djWb6D7HV8J";
  metadata: {
    name: "ulbsolve";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "addToWishlist";
      discriminator: [183, 178, 106, 148, 159, 143, 150, 68];
      accounts: [
        {
          name: "user";
        },
        {
          name: "commission";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "addToWorkingOn";
      discriminator: [132, 222, 127, 76, 83, 238, 85, 207];
      accounts: [
        {
          name: "user";
        },
        {
          name: "commission";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "createCommission";
      discriminator: [142, 218, 95, 250, 188, 9, 58, 75];
      accounts: [
        {
          name: "user";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114];
              },
              {
                kind: "account";
                path: "user";
              }
            ];
          };
        },
        {
          name: "commission";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 109, 109, 105, 115, 115, 105, 111, 110];
              },
              {
                kind: "account";
                path: "user";
              },
              {
                kind: "account";
                path: "user.created_commissions";
                account: "user";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "title";
          type: "string";
        },
        {
          name: "description";
          type: "string";
        },
        {
          name: "reward";
          type: "i64";
        },
        {
          name: "image";
          type: {
            option: "string";
          };
        },
        {
          name: "deadline";
          type: {
            option: "i64";
          };
        }
      ];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [];
      args: [];
    },
    {
      name: "submitCommission";
      discriminator: [178, 42, 18, 34, 24, 217, 31, 227];
      accounts: [
        {
          name: "submitter";
          writable: true;
          signer: true;
        },
        {
          name: "commission";
          writable: true;
        },
        {
          name: "user";
          writable: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "deliveryMessage";
          type: "string";
        },
        {
          name: "deliveryFilepath";
          type: "string";
        }
      ];
    },
    {
      name: "updateProfile";
      discriminator: [98, 67, 99, 206, 86, 115, 175, 1];
      accounts: [
        {
          name: "user";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114];
              },
              {
                kind: "account";
                path: "publicKey";
              }
            ];
          };
        },
        {
          name: "publicKey";
          writable: true;
          signer: true;
          relations: ["user"];
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "username";
          type: {
            option: "string";
          };
        },
        {
          name: "profileImage";
          type: {
            option: "string";
          };
        }
      ];
    }
  ];
  accounts: [
    {
      name: "commission";
      discriminator: [152, 254, 124, 223, 255, 105, 124, 133];
    },
    {
      name: "user";
      discriminator: [159, 117, 95, 227, 239, 151, 58, 236];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "unauthorized";
      msg: "You are not authorized to update this profile";
    },
    {
      code: 6001;
      name: "usernameMaxLengthExceeded";
      msg: "Username exceeds maximum length of 32 characters";
    },
    {
      code: 6002;
      name: "profileImageMaxLengthExceeded";
      msg: "Profile image exceeds maximum length of 32 characters";
    }
  ];
  types: [
    {
      name: "commission";
      type: {
        kind: "struct";
        fields: [
          {
            name: "requestAuthor";
            type: "pubkey";
          },
          {
            name: "title";
            type: "string";
          },
          {
            name: "description";
            type: "string";
          },
          {
            name: "image";
            type: "string";
          },
          {
            name: "reward";
            type: "i64";
          },
          {
            name: "rewardEscrowAccount";
            type: "pubkey";
          },
          {
            name: "escrowInitialized";
            type: "bool";
          },
          {
            name: "createdAt";
            type: "i64";
          },
          {
            name: "deadline";
            type: {
              option: "i64";
            };
          },
          {
            name: "commissionStatus";
            type: {
              defined: {
                name: "commissionStatus";
              };
            };
          },
          {
            name: "commissionParticipants";
            type: {
              vec: "pubkey";
            };
          },
          {
            name: "submissions";
            type: {
              vec: {
                defined: {
                  name: "submission";
                };
              };
            };
          },
          {
            name: "acceptedSubmissionIndex";
            type: {
              option: "u8";
            };
          },
          {
            name: "cancellationFeePercentage";
            type: "u8";
          },
          {
            name: "cancellationReason";
            type: {
              option: "string";
            };
          },
          {
            name: "cancelledAt";
            type: {
              option: "i64";
            };
          },
          {
            name: "disputeInitiatedAt";
            type: {
              option: "i64";
            };
          },
          {
            name: "disputeInitiatedBy";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "disputeResolutionDeadline";
            type: {
              option: "i64";
            };
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "commissionStatus";
      type: {
        kind: "enum";
        variants: [
          {
            name: "open";
          },
          {
            name: "underReview";
          },
          {
            name: "completed";
          },
          {
            name: "cancelled";
          }
        ];
      };
    },
    {
      name: "submission";
      type: {
        kind: "struct";
        fields: [
          {
            name: "submitter";
            type: "pubkey";
          },
          {
            name: "submittedAt";
            type: "i64";
          },
          {
            name: "deliveryMessage";
            type: "string";
          },
          {
            name: "deliveryFilepath";
            type: "string";
          },
          {
            name: "status";
            type: {
              defined: {
                name: "submissionStatus";
              };
            };
          },
          {
            name: "reviewFeedback";
            type: {
              option: "string";
            };
          },
          {
            name: "reviewedAt";
            type: {
              option: "i64";
            };
          }
        ];
      };
    },
    {
      name: "submissionStatus";
      type: {
        kind: "enum";
        variants: [
          {
            name: "pending";
          },
          {
            name: "accepted";
          },
          {
            name: "rejected";
          },
          {
            name: "pendingRevision";
          }
        ];
      };
    },
    {
      name: "user";
      type: {
        kind: "struct";
        fields: [
          {
            name: "publicKey";
            type: "pubkey";
          },
          {
            name: "username";
            type: "string";
          },
          {
            name: "profileImage";
            type: "string";
          },
          {
            name: "createdCommissions";
            type: "u64";
          },
          {
            name: "wishlist";
            type: {
              vec: "pubkey";
            };
          },
          {
            name: "workingOn";
            type: {
              vec: "pubkey";
            };
          },
          {
            name: "createdAt";
            type: "i64";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    }
  ];
};
