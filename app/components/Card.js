import { cardData } from "../data";
import Link from "next/link";

export default function Card() {
  let card = cardData;
  return (
    <>
      {card?.map((_, i) => {
        return (
          <Link href={card[i].url} key={i}>
            <div className="card">
              <h3>{card[i].title}</h3>
              <div>{card[i].contents}</div>
              <div>{card[i].icon}</div>
            </div>
          </Link>
        );
      })}
    </>
  );
}
