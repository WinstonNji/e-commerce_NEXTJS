"use client";
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useContext } from "react";
import { CartContext } from "@/context/cartContext";

export default function VerifyPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {fetchCartItems} = useContext(CartContext)

  useEffect(() => {
    const verifyTransaction = async () => {
      try {
        // Convert URLSearchParams to string
        const queryString = searchParams.toString();
        console.log(queryString, "queryString");

        const url = `/api/v1/verify_transaction?${queryString}`;
        const res = await fetch(url, { cache: "no-store" });

        if (!res.ok) throw new Error("Verification failed");
        const result = await res.json();

        console.log(result, "******result");

        if (!result.success) {
            toast.error(result.message || "Transaction failed");
            setTimeout(() => router.replace("/cart"), 1500);
            return;
        }

        toast.success(result.message + '. Page redirection will occur soon....' || "Payment verified successfully!");
        fetchCartItems()
        setTimeout(() => router.replace("/"), 1500);
      } catch (error) {
        console.error(error);
        toast.error("An error occurred during verification");
        setTimeout(() => router.replace("/cart"), 1500);
      }
    };

    verifyTransaction();
  }, [router, searchParams]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex items-center justify-center min-h-screen px-4 bg-base-300">
        <div className="bg-primary rounded-2xl shadow-xl p-8 md:p-12 max-w-md w-full">
          <div className="flex flex-col items-center space-y-6">
            {/* Spinner */}
            <div className="relative">
              <div className="w-16 h-16 border-4 border-secondary border-t-accent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-accent">
              Verifying Payment
            </h2>

            <div className="space-y-3 text-center">
              <p className="font-medium leading-relaxed text-gray-700">
                Please do not close or refresh this page.
              </p>
              <p className="text-sm leading-relaxed text-gray-600">
                You will be redirected automatically once your transaction is
                verified.
              </p>
            </div>

            <div className="flex items-start space-x-2 text-xs bg-base-300 text-gray-600 rounded-lg p-3 w-full">
              <svg
                className="w-4 h-4 text-accent flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="leading-relaxed">
                This process typically takes a few seconds
              </span>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
    
  );
}
