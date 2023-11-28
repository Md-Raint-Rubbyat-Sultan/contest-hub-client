import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardElementToPay from "../../components/Payment/CardrEleemnt/CardrEleemnt";
import H3Prime from "../../components/Utils/H3Prime";
import { useParams } from "react-router-dom";
import MySpinner from "../../components/Shared/Spinner/MySpinner";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PAYMENT_KEY);

const Payment = () => {
  const id = useParams();
  const axiosSecure = useAxiosSecure();

  const { isPending, data: contest } = useQuery({
    queryKey: ["single-contest"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/single-contest/${id?.id}`, {
        headers: { "content-type": "application/json" },
      });
      return data;
    },
  });

  if (isPending) return <MySpinner />;

  const { _id, price, participation_count, name, category, date } = contest;
  console.log(contest);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-11/12 md:w-3/4 lg:w-1/2 mx-auto space-y-8">
        <H3Prime custom={"text-[#283618]"}>Amount: ${price}</H3Prime>
        <div>
          <Elements stripe={stripePromise}>
            <CardElementToPay
              price={price}
              _id={_id}
              participation_count={participation_count}
              name={name}
              category={category}
              date={date}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
