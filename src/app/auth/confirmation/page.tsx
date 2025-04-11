import { Suspense } from "react";
import ConfirmationClient from "./client";

export default function ConfirmationPage() {
    return (
        <Suspense fallback={<div className="text-center py-12">Loading confirmation...</div>}>
            <ConfirmationClient />
        </Suspense>
    );
}