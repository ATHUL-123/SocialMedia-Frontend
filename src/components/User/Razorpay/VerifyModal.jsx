import React from 'react';
import ReactDOM from 'react-dom';
import { startPayment, paymentSuccess } from '../../../services/User/apiMethods';
import { useDispatch } from 'react-redux';
import { changeVerify } from '../../../features/auth/authSlice';

function AddVerifiedModal({ isOpen, closeModal, user, notifyClose }) {
    const dispatch = useDispatch()
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await startPayment()

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }
        closeModal()
        const { amount, id: order_id, currency } = result;

        const options = {
            key: "rzp_test_EkB64T3dRlXXxF", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "SocialMedia",
            description: "Test Transaction",
            image: user.profilePic,
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await paymentSuccess(data)

                dispatch(changeVerify(true))
                notifyClose()
            },
            prefill: {
                name: user.userName,
                email: user.email,
                contact: user.phone,
            },
            notes: {
                address: "SocialMedia Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }


    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50"></div>

            {/* Modal */}
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
                <div className="relative bg-white rounded-lg shadow-xl p-6 sm:p-10">
                    <h2 className="text-lg font-bold mb-4">Upgrade to Verified Account</h2>
                    <p className="text-sm text-gray-600 mb-6">Upgrade your account to get a verified badge. The badge signifies your account as authentic and increases your credibility.</p>
                    <p className="text-sm text-gray-600 mb-6">Benefits:</p>
                    <ul className="text-sm text-gray-600 mb-6">
                        <li>Verified badge displayed on your profile</li>
                        <li>Increased credibility and trustworthiness</li>
                        <li>Enhanced visibility and recognition</li>
                    </ul>
                    <p className="text-sm text-gray-600 mb-6">Price: ₹1200 per year</p>
                    <button
                        onClick={displayRazorpay}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    >
                        Upgrade Now
                    </button>
                    <button
                        onClick={closeModal}
                        className="text-gray-600 mt-4 transition duration-300 hover:text-gray-800 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>,

        document.getElementById('portal-root')
    );
}




export default AddVerifiedModal;
