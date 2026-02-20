"use client";

import { TOPICS, Topic } from "@/lib/types";

interface TopicSelectorProps {
  selectedTopic: Topic;
  onSelectTopic: (topic: Topic) => void;
}

export default function TopicSelector({
  selectedTopic,
  onSelectTopic,
}: TopicSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {TOPICS.map((topic) => (
        <button
          key={topic.value}
          onClick={() => onSelectTopic(topic.value)}
          className={`brutal-pill px-3 py-2 ${topic.color} text-brutal-black ${
            selectedTopic === topic.value ? "active" : ""
          }`}
        >
          {topic.label}
        </button>
      ))}
    </div>
  );
}
