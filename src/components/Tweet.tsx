import { Tweet } from "react-tweet";

export default function TweetCard({ id }: { id: string }) {
  return (
    <div className="tweet-card" data-theme="dark">
      <Tweet id={id} />
    </div>
  );
}
