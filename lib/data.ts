const dummyData = {
    categories: [
        { name: "Mood", description: "Emotional and psychological symptoms" },
        { name: "Physical", description: "Bodily aches, bloating, and fatigue" },
        { name: "Sleep", description: "Insomnia and sleep-quality symptoms" },
        { name: "Coping", description: "Grounding and self-regulation strategies" },
        { name: "Relationships", description: "Communicating with people around you" },
        { name: "Crisis", description: "What to do on the hardest days" },
    ],

    affirmations: [
        { title: "This phase will pass", body: "The luteal phase is temporary. What I feel today is not permanent." },
        { title: "I am allowed to rest", body: "Rest is not laziness. My body is doing real work right now." },
        { title: "My feelings are valid", body: "PMDD amplifies emotion — it doesn't invent it. I can feel this and still be okay." },
        { title: "I don't have to do it all today", body: "Lowering the bar today is self-care, not failure." },
        { title: "I am not my worst day", body: "One hard day doesn't erase who I am the rest of the month." },
        { title: "Asking for help is strength", body: "Reaching out to my tether contact is a plan working, not a plan failing." },
    ],

    resources: [
        {
            name: "Understanding PMDD",
            description: "What PMDD is, how it differs from PMS, and how it's diagnosed.",
            category_name: "Mood",
            tags: ["education", "diagnosis"],
        },
        {
            name: "Riding Out Irritability",
            description: "Grounding techniques for sudden anger or irritability spikes.",
            category_name: "Mood",
            tags: ["irritability", "grounding"],
        },
        {
            name: "Managing Bloating & Cramping",
            description: "Gentle movement and heat therapy for physical luteal symptoms.",
            category_name: "Physical",
            tags: ["bloating", "cramps"],
        },
        {
            name: "Fatigue-Friendly Routines",
            description: "Lowering your daily bar without losing structure.",
            category_name: "Physical",
            tags: ["fatigue", "routine"],
        },
        {
            name: "Falling Asleep on Hard Nights",
            description: "A wind-down routine for luteal-phase insomnia.",
            category_name: "Sleep",
            tags: ["insomnia", "wind-down"],
        },
        {
            name: "Box Breathing for Panic Spikes",
            description: "A 4-4-4-4 breathing pattern to interrupt anxiety spirals.",
            category_name: "Coping",
            tags: ["anxiety", "breathing"],
        },
        {
            name: "Talking to Your Partner About PMDD",
            description: "Scripts for explaining symptoms without over-explaining yourself.",
            category_name: "Relationships",
            tags: ["communication", "partner"],
        },
        {
            name: "When to Reach Out for Crisis Support",
            description: "Warning signs that mean it's time to call your tether contact or a hotline.",
            category_name: "Crisis",
            tags: ["safety", "hotline"],
        },
        {
            name: "Talking to Your Doctor About PMDD",
            description: "Questions to bring to an appointment and what treatment options exist.",
            category_name: "Mood",
            tags: ["treatment", "doctor"],
        },
        {
            name: "Building a Support Plan",
            description: "How to turn your worst symptom days into a step-by-step plan.",
            category_name: "Coping",
            tags: ["planning", "support"],
        },
        {
            name: "Nutrition & the Luteal Phase",
            description: "Foods that may ease bloating, cravings, and energy dips.",
            category_name: "Physical",
            tags: ["nutrition", "cravings"],
        },
        {
            name: "Setting Boundaries During PMDD Week",
            description: "Saying no to plans and commitments without guilt.",
            category_name: "Relationships",
            tags: ["boundaries"],
        },
    ],

    cyclePhaseCopy: [
        { phase: "menstrual", title: "Menstrual Phase", blurb: "Rest is productive. Be gentle with yourself today." },
        { phase: "follicular", title: "Follicular Phase", blurb: "Energy is returning — a good window to plan ahead." },
        { phase: "ovulation", title: "Ovulation Phase", blurb: "You may feel your most social and energetic self." },
        { phase: "luteal", title: "Luteal Phase", blurb: "PMDD symptoms can peak now — lean on your support plan." },
    ],
};

export default dummyData;
