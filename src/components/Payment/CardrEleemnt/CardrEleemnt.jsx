import { Button } from "flowbite-react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import MySpinner from "../../Shared/Spinner/MySpinner";
import PropTypes from "prop-types";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const CardElementToPay = ({
  price,
  prize,
  _id,
  participation_count,
  name,
  category,
  date,
}) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(() => false);
  const [error, setError] = useState(() => "");
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: clientSecret, isPending } = useQuery({
    queryKey: ["create-payment-intent"],
    queryFn: async () => {
      const { data } = await axiosPublic.post("/create-payment-intent", {
        price,
      });
      return data?.client_secret;
    },
  });

  if (isPending) return <MySpinner />;

  //   console.log(clientSecret);

  const handleSubmitPayment = async (e) => {
    setLoading(() => true);
    e.preventDefault();

    if (!stripe || !elements) {
      setLoading(() => false);
      return toast.error("Payment method is missing!");
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      setLoading(() => false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setLoading(() => false);
      console.log("error payment", error);
      setError(() => error.message);
      return toast.error(error.message);
    } else {
      setLoading(() => false);
      console.log("payment info", paymentMethod);
      setError(() => "");
    }

    // confirm card payment

    const { error: paymentError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });

    if (paymentError) {
      setLoading(() => false);
      console.log(paymentError);
      setError(() => paymentError.message);
    } else {
      setError(() => setError(() => ""));
      if (paymentIntent.status === "succeeded") {
        // console.log(paymentIntent.id);
        axiosSecure
          .post("/payment-info", {
            transactionId: paymentIntent.id,
            price: parseFloat(price),
            prize: parseFloat(prize),
            userEmail: user?.email,
            userName: user?.displayName,
            userImg: user?.photoURL,
            contestId: _id,
            participation: false,
            contestName: name,
            category: category,
            contestDate: date,
          })
          .then((res) => {
            if (res.data?.contestId) {
              axiosPublic
                .patch(`/update-participation-count/${_id}`, {
                  count: participation_count + 1,
                })
                .then(() => {
                  toast.success("Payment success!");
                  navigate("/all-contests/?category=Article");
                })
                .catch((err) => console.log(err));
            }
          })
          .catch((er) => console.log(er))
          .finally(() => {
            setLoading(() => false);
          });
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmitPayment}
        className="flex items-center gap-6 max-w-[2050px] mx-auto w-full"
      >
        <div className="w-full">
          <CardElement
            className="w-full border-2 p-4"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "black",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <Button
          color="success"
          type="submit"
          disabled={!stripe || !clientSecret || loading}
        >
          Pay
        </Button>
      </form>
      <p>{error}</p>
    </div>
  );
};

CardElementToPay.propTypes = {
  price: PropTypes.number.isRequired,
  prize: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  participation_count: PropTypes.number.isRequired,
};

export default CardElementToPay;
