import { useSearchParams } from "react-router-dom";
import DepositSuccess from "./DepositSuccess";
import DepositFailed from "./DepositFailed";

export default function DepositResult() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  return <>{status === "1" ? <DepositSuccess /> : <DepositFailed />}</>;
}
