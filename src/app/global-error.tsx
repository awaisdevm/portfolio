"use client";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body>
                <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
                    <h2 className="text-xl font-bold">Something went wrong!</h2>
                    <button
                        onClick={() => reset()}
                        className="mt-4 rounded-md bg-primary px-4 py-2 text-white"
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}