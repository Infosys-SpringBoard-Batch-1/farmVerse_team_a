export default function ChatMessage({ message, isUser }) {
  return (
    <div
      className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"
        }`}
    >
      <div
        className={`
          max-w-[85%]
          rounded-2xl
          px-5
          py-3.5
          text-sm
          leading-relaxed
          [&>ul]:list-disc [&>ul]:ml-5 [&>ul]:mb-2 [&>ul>li]:pl-1 [&>ul>li]:mb-1
          [&>ol]:list-decimal [&>ol]:ml-5 [&>ol]:mb-2 [&>ol>li]:pl-1 [&>ol>li]:mb-1
          [&>p]:mb-2 [&>p:last-child]:mb-0
          ${isUser
            ? "bg-green-700 text-white rounded-br-md"
            : "bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm"
          }
        `}
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </div>
  );
}