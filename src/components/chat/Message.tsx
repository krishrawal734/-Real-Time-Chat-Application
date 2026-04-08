import { format } from "date-fns";

interface MessageProps {
  text: string;
  timestamp: string;
  isMine: boolean;
  senderName: string;
}

export default function Message({ text, timestamp, isMine, senderName }: MessageProps) {
  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl ${
          isMine
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-muted text-foreground rounded-bl-md"
        }`}
      >
        {!isMine && (
          <p className="text-xs font-medium mb-1 opacity-70">{senderName}</p>
        )}
        <p className="text-sm whitespace-pre-wrap break-words">{text}</p>
        <p className={`text-[10px] mt-1 ${isMine ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
          {format(new Date(timestamp), "HH:mm")}
        </p>
      </div>
    </div>
  );
}
