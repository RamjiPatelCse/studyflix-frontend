const lines = text.split("\n");

let subjects = [];
let currentSubject = null;
let currentTopic = null;

lines.forEach((line) => {
  line = line.trim();

  // Subject
  if (
    line.startsWith("(") &&
    !line.includes("Live") &&
    !line.includes("Recorded")
  ) {
    currentSubject = {
      name: line.replace(/[()]/g, ""),
      topics: [],
    };

    subjects.push(currentSubject);
  }

  // Topic
  else if (
    line.startsWith("(") &&
    line.includes("✅")
  ) {
    currentTopic = {
      name: line.replace(/[()]/g, ""),
      lectures: [],
    };

    currentSubject?.topics.push(currentTopic);
  }

  // Lecture
  else if (/^\d+\./.test(line)) {
    const lectureTitle = line;

    const lectureId =
      lines[lines.indexOf(line) + 1];

    currentTopic?.lectures.push({
      title: lectureTitle,
      id: lectureId,
    });
  }
});
