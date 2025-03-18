import { iconsImgs } from "../../utils/images"


const financialAdvice = [
  "Apni income ka 20% savings aur investments me lagayein.",
  "Emergency ke liye hamesha 6 mahine ka expense alag rakhein.",
  "Debt-free hone ki koshish karein aur unnecessary loans na lein.",
  "Har mahine budget banayein aur uska palan karein.",
  "Mutual funds aur stocks me invest karne se pehle research karein.",
  "Credit card ka istemal sirf zaroorat ke waqt karein aur time par bill chukayein.",
  "Retirement planning jaldi shuru karein taki financial freedom mile.",
  "Apni income badhane ke naye tareeke khojein jaise freelancing ya side business.",
  "Medical insurance lene se future financial burden se bach sakte hain.",
  "Fixed Deposits aur Recurring Deposits bhi ek safe investment option hain.",
];

const Financial = () => {
  return (
    <div className="subgrid-two-item grid-common grid-c8 flex flex-col justify-between">
        <div className="grid-c-title">
            <h3 className="grid-c-title-text">Financial Advice</h3>
            <button className="grid-c-title-icon">
                <img src={ iconsImgs.plus } />
            </button>
        </div>
        <div className="grid-c8-content">
        {financialAdvice.map((advice, index) => (
          <div key={index} className="flex items-start space-x-2">
            <span className="text-green-500 font-bold">✔</span>
            <p className="text text-silver-v1">{advice}</p>
                </div>
        ))}
        </div>
    </div>
  )
}

export default Financial