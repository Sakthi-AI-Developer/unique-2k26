export type EventItem = {
  id: string
  category: 'TECHNICAL' | 'NON-TECHNICAL'
  title: string
  type: string
  description: string
  objective: string
  eligibility: string
  needs: string
  judging: string
  information: string
  rules: string[]
}

export const events: EventItem[] = [
  { id: '01', category: 'TECHNICAL', title: 'Glitch Verse', type: 'Codeathon', description: 'Build a sharp, useful solution under pressure and make every line count.', objective: 'Turn a real-world prompt into a working prototype.', eligibility: 'Open to undergraduate students with a campus ID.', needs: 'Laptop, charger, and your preferred development stack.', judging: 'Problem clarity, technical execution, usability, and demo quality.', information: 'A timed build with mentor checkpoints and a final presentation.', rules: ['Original work only', 'Teams may have 1–4 members', 'Final demo and source review are required'] },
  { id: '02', category: 'TECHNICAL', title: 'Mind Spark', type: 'Ideathon', description: 'A room for bold ideas, thoughtful problem solving, and solutions worth sharing.', objective: 'Present an original idea that can create meaningful change.', eligibility: 'Students from any discipline may participate.', needs: 'A concise pitch deck or visual prototype.', judging: 'Originality, feasibility, impact, and clarity of thought.', information: 'Teams move from concept note to a short jury pitch.', rules: ['One idea per team', 'Teams may have 1–4 members', 'Cite research and references clearly'] },
  { id: '03', category: 'TECHNICAL', title: 'RE: UX', type: 'UI/UX Reverse Engineering', description: 'Study a familiar digital experience, then rebuild its logic in your own language.', objective: 'Analyze interaction patterns and recreate an experience with intent.', eligibility: 'Open to design, technology, and product thinkers.', needs: 'Laptop with design or prototyping software.', judging: 'Observation, information architecture, visual craft, and rationale.', information: 'A reference experience is revealed at the start of the round.', rules: ['No copying source assets', 'Teams may have 1–4 members', 'Explain decisions in the final walkthrough'] },
  { id: '04', category: 'TECHNICAL', title: 'AI Prompt Battle', type: 'Odessey Tech', description: 'Find the precise language that turns an open-ended problem into a useful result.', objective: 'Use responsible prompting and structured thinking to solve live challenges.', eligibility: 'Students curious about AI and creative problem solving.', needs: 'Laptop and a working knowledge of common AI tools.', judging: 'Prompt design, reasoning, output quality, and responsible use.', information: 'Multiple rounds move from prompt writing to solution defense.', rules: ['No private data or unsafe content', 'Teams may have 1–4 members', 'Explain the process, not just the result'] },
  { id: '05', category: 'TECHNICAL', title: 'SQL Battle Royal', type: 'Database Challenge', description: 'Query your way through a sequence of data puzzles where precision wins.', objective: 'Solve database challenges quickly with elegant, reliable queries.', eligibility: 'Open to students with SQL fundamentals.', needs: 'Laptop; a browser-based environment will be provided.', judging: 'Accuracy, efficiency, edge-case handling, and time.', information: 'Qualifying queries lead to a live final leaderboard.', rules: ['Use only the provided schema', 'Teams may have 1–4 members', 'Queries must be explainable'] },
  { id: '06', category: 'NON-TECHNICAL', title: 'Hint Crackers', type: 'Storytelling by Keywords', description: 'Turn a handful of unexpected words into a story no one saw coming.', objective: 'Create a memorable narrative from a shared set of keywords.', eligibility: 'Open to all students and storytellers.', needs: 'Nothing but a voice, imagination, and a point of view.', judging: 'Narrative arc, originality, delivery, and connection with the room.', information: 'Keywords are revealed on stage and stories are told live.', rules: ['Solo or team of up to 4', 'Stories must be original', 'Performance time is limited'] },
  { id: '07', category: 'NON-TECHNICAL', title: 'Tech-it-out', type: 'Just a Minute', description: 'Think fast, speak clearly, and stay with the thought before the clock catches you.', objective: 'Hold the room with an impromptu one-minute speech.', eligibility: 'Open to students from every department.', needs: 'Confidence, clarity, and a willingness to improvise.', judging: 'Fluency, relevance, structure, and composure.', information: 'Participants receive a topic and one minute to make it matter.', rules: ['No prepared scripts', 'One participant per turn', 'Time penalties apply'] },
  { id: '08', category: 'NON-TECHNICAL', title: 'Connexion', type: 'Connection Challenge', description: 'Spot the hidden link between clues, images, names, and moments.', objective: 'Identify the common thread before the other teams do.', eligibility: 'Open to students; teams of 1–4.', needs: 'A team name and a quick eye for patterns.', judging: 'Correct answers and speed across multiple rounds.', information: 'Visual, audio, and cultural clues build toward a final connection.', rules: ['Teams may have 1–4 members', 'No phones during rounds', 'Answer sheets are final'] },
  { id: '09', category: 'NON-TECHNICAL', title: 'Video Clip', type: 'Chitiram: The Visual Saga', description: 'Read the frame, hear the clue, and interpret the visual story in front of you.', objective: 'Identify and interpret a sequence of visual and video clues.', eligibility: 'Open to every student team.', needs: 'Observation, cultural awareness, and quick recall.', judging: 'Accuracy, interpretation, and response time.', information: 'Short clips and stills lead through a fast-paced visual quiz.', rules: ['Teams may have 1–4 members', 'No recording during the event', 'Tie-breakers use sudden-death clues'] },
  { id: '10', category: 'NON-TECHNICAL', title: 'On the Spot Quiz', type: 'Thedal: The Journey of Knowledge', description: 'A fast-moving general knowledge quiz for teams that know a little about everything.', objective: 'Navigate current affairs, culture, science, and the unexpected.', eligibility: 'Open to all college students.', needs: 'A team of curious people and quick recall.', judging: 'Correct answers, speed, and final-round performance.', information: 'Prelims, a themed middle round, and a high-stakes finale.', rules: ['Teams may have 1–4 members', 'No electronic aids', 'The quizmaster’s decision is final'] },
]

export type Coordinator = {
  name: string
  label: 'HEAD OF DEPARTMENT' | 'FACULTY COORDINATOR' | 'STUDENT COORDINATOR'
  designation: string
  department: string
  year?: string
  role: string
  bio: string
  contact?: string
  image: string
}

export const coordinators: Coordinator[] = [
  { name: 'Name to be announced', label: 'HEAD OF DEPARTMENT', designation: 'Head of Department', department: 'Department to be announced', role: 'Academic direction', bio: 'Guiding the academic vision and collaborative spirit behind UNIQUE 2K26.', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85' },
  { name: 'Faculty coordinator', label: 'FACULTY COORDINATOR', designation: 'Faculty Coordinator', department: 'Department to be announced', role: 'Faculty coordination', bio: 'Supporting every moving part with care, clarity, and campus experience.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85' },
  { name: 'Faculty coordinator', label: 'FACULTY COORDINATOR', designation: 'Faculty Coordinator', department: 'Department to be announced', role: 'Faculty coordination', bio: 'Connecting teams, mentors, and participants across the symposium.', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85' },
  { name: 'Student coordinator', label: 'STUDENT COORDINATOR', designation: 'Student Coordinator', department: 'Department to be announced', year: 'Year to be announced', role: 'Student coordination', bio: 'Bringing student energy, ideas, and momentum to the event floor.', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=85' },
  { name: 'Student coordinator', label: 'STUDENT COORDINATOR', designation: 'Student Coordinator', department: 'Department to be announced', year: 'Year to be announced', role: 'Student coordination', bio: 'Helping every participant find their place in the UNIQUE experience.', image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=85' },
  { name: 'Student coordinator', label: 'STUDENT COORDINATOR', designation: 'Student Coordinator', department: 'Department to be announced', year: 'Year to be announced', role: 'Student coordination', bio: 'Turning plans into welcoming, thoughtful campus moments.', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=85' },
]

export const faqs = [
  ['What is UNIQUE 2K26?', 'UNIQUE 2K26 is a college symposium bringing students together through technology, creativity, innovation, and entertainment.'],
  ['What is the registration fee?', 'Registration is ₹300 per person. The same global registration link is used for every event.'],
  ['What is the maximum team size?', 'Teams may have 1–4 members. Individuals are welcome to participate.'],
  ['Can a team participate in more than one event?', 'No. Each team can select only one event from either the Technical or Non-Technical category.'],
  ['Can we choose both a technical and non-technical event?', 'No. The participation rule is one event total: choose Technical or Non-Technical.'],
  ['What are the technical events?', 'Glitch Verse, Mind Spark, RE: UX, AI Prompt Battle, and SQL Battle Royal.'],
  ['What are the non-technical events?', 'Hint Crackers, Tech-it-out, Connexion, Video Clip, and On the Spot Quiz.'],
  ['How do I register?', 'Use the prominent REGISTER NOW button near the hero or in the registration section.'],
]
