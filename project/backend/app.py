from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import requests


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Updated psychometric test questions from the document
QUESTIONS = [
    {"id": 1, "text": "What subjects or topics do you enjoy the most?", 
     "options": ["Science", "Technology", "Arts", "Business", "Healthcare", "Social Sciences", "Engineering", "Education", "Environment/Nature", "Other"]},
    
    {"id": 2, "text": "What are your hobbies or activities you love doing in your free time?", 
     "options": ["Reading/Writing", "Drawing/Painting", "Coding/Programming", "Playing Sports", "Volunteering/Helping Others", "Building/Fixing Things", "Traveling/Exploring", "Other"]},
    
    {"id": 3, "text": "Do you prefer working indoors or outdoors?", 
     "options": ["Indoors", "Outdoors", "A mix of both"]},

    {"id": 4, "text": "What are you naturally good at?", 
     "options": ["Problem-solving", "Communication", "Creativity", "Leadership", "Analytical Thinking", "Technical Skills", "Teamwork", "Organization", "Other"]},

    {"id": 5, "text": "Do you work better when given individual tasks or when collaborating with a team?", 
     "options": ["Independently", "In a team", "A mix of both"]},

    {"id": 6, "text": "What type of work environment do you prefer?", 
     "options": ["Office setting", "Remote work", "Outdoor/Fieldwork", "Flexible/Freelance"]},

    {"id": 7, "text": "Would you prioritize a job with high financial stability, a job aligned with your interests, or a balance of both?", 
     "options": ["High-paying job", "Job that aligns with passions", "A balance of both"]},

    {"id": 8, "text": "Do you want a career that involves travel or staying in one location?", 
     "options": ["Travel frequently", "Stay in one location", "Occasional travel"]},

    {"id": 9, "text": "How do you handle challenges?", 
     "options": ["I enjoy solving complex problems.", "I prefer collaborating with others to find solutions.", "I like to think creatively and come up with new ideas."]},

    {"id": 10, "text": "Are you willing to pursue further education or training for your career?", 
     "options": ["Yes", "No", "Maybe"]}
]

# Expanded career predictions based on responses
CAREER_PREDICTIONS = {
    "technical": [
        {"role": "Software Engineer", "confidence": 0.85, "description": "Develop and maintain software applications"},
        {"role": "Data Scientist", "confidence": 0.78, "description": "Analyze and interpret complex data"},
        {"role": "Cybersecurity Analyst", "confidence": 0.80, "description": "Protect systems and networks from cyber threats"},
        {"role": "Mechanical Engineer", "confidence": 0.75, "description": "Design and develop mechanical systems"},
        {"role": "AI Research Scientist", "confidence": 0.82, "description": "Develop AI models and deep learning algorithms"}
    ],
    "creative": [
        {"role": "Graphic Designer", "confidence": 0.90, "description": "Create visual concepts using computer software"},
        {"role": "Content Writer", "confidence": 0.82, "description": "Produce written content for various media"},
        {"role": "Film Director", "confidence": 0.80, "description": "Direct and produce films or media content"},
        {"role": "Architect", "confidence": 0.78, "description": "Design and plan buildings and structures"}
    ],
    "business": [
        {"role": "Marketing Manager", "confidence": 0.85, "description": "Plan and execute marketing strategies"},
        {"role": "Entrepreneur", "confidence": 0.88, "description": "Start and run your own business"},
        {"role": "Financial Analyst", "confidence": 0.80, "description": "Analyze financial data to help businesses make decisions"},
        {"role": "Project Manager", "confidence": 0.84, "description": "Lead and manage projects across industries"}
    ],
    "healthcare": [
        {"role": "Doctor", "confidence": 0.92, "description": "Diagnose and treat patients"},
        {"role": "Nurse", "confidence": 0.88, "description": "Provide healthcare and support to patients"},
        {"role": "Psychologist", "confidence": 0.80, "description": "Help people manage mental health challenges"},
        {"role": "Pharmacist", "confidence": 0.85, "description": "Dispense medications and advise on proper usage"}
    ],
    "environmental": [
        {"role": "Environmental Scientist", "confidence": 0.82, "description": "Research and develop solutions for environmental issues"},
        {"role": "Wildlife Conservationist", "confidence": 0.75, "description": "Protect and manage wildlife populations"},
        {"role": "Sustainability Consultant", "confidence": 0.78, "description": "Advise businesses on sustainable practices"}
    ]
}

@app.route('/api/questions', methods=['GET'])
def get_questions():
    return jsonify(QUESTIONS)

@app.route('/api/analyze', methods=['POST'])
def analyze_responses():
    data = request.json
    responses = data.get('responses', {})

    scores = {
        "technical": sum(1 for resp in responses.values() if resp in ["Science", "Technology", "Engineering", "Coding/Programming"]),
        "creative": sum(1 for resp in responses.values() if resp in ["Arts", "Drawing/Painting", "Writing", "Design"]),
        "business": sum(1 for resp in responses.values() if resp in ["Business", "Leadership", "Entrepreneurship"]),
        "healthcare": sum(1 for resp in responses.values() if resp in ["Healthcare", "Social Sciences", "Helping Others"]),
        "environmental": sum(1 for resp in responses.values() if resp in ["Environment/Nature", "Sustainability", "Wildlife Conservation"])
    }

    best_fit = max(scores, key=scores.get)  # Find the category with the highest score
    
    # Prepare data for AI analysis
    headers = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTk5NDU0YmItMmQ2NS00NjAyLWI2NDgtOGU2ZDZjODQ5OTUzIiwidHlwZSI6ImFwaV90b2tlbiJ9.SgDWTc85FXx4YrLwG7s6M720jJgatbk3jFKoF7purTQ"}
    url = "https://api.edenai.run/v2/text/custom_classification"
    
    # Convert responses to AI input format
    response_texts = [f"Question {qid}: {response}" for qid, response in responses.items()]
    
    payload = {
        "providers": "openai",
        "labels": list(CAREER_PREDICTIONS.keys()),
        "texts": response_texts,
        "examples": [
            ["I enjoy technology and programming", "technical"],
            ["I love art and creative activities", "creative"],
            ["I'm interested in business and leadership", "business"],
            ["I want to help people and work in healthcare", "healthcare"],
            ["I'm passionate about nature and the environment", "environmental"]
        ],
    }
    
    # Get AI analysis
    ai_response = requests.post(url, json=payload, headers=headers)
    ai_result = json.loads(ai_response.text)
    
    # Combine AI analysis with existing predictions
    ai_predictions = ai_result.get('openai', {}).get('items', [])
    enhanced_predictions = []
    
    for pred in CAREER_PREDICTIONS[best_fit]:
        enhanced_pred = pred.copy()
        ai_match = next((p for p in ai_predictions if p['label'] == best_fit), None)
        if ai_match:
            enhanced_pred['ai_confidence'] = ai_match['confidence']
        enhanced_predictions.append(enhanced_pred)
    
    return jsonify({
        "predictions": enhanced_predictions,
        "responses": responses,
        "ai_analysis": ai_result
    })



CAREER_INSIGHTS = {
    "Software Engineer": {
        "overview": {
            "description": "Develop and maintain software applications across various platforms",
            "demand": "High",
            "workEnvironment": "Office or remote, collaborative teams"
        },
        "skills": {
            "technical": ["Programming", "Algorithms", "System Design"],
            "soft": ["Problem-solving", "Communication", "Teamwork"]
        },
        "salary": {
            "entryLevel": 80000,
            "midLevel": 120000,
            "seniorLevel": 160000
        },
        "growth": {
            "outlook": "Excellent",
            "growthRate": "22% (Much faster than average)"
        }
    },
    "Data Scientist": {
        "overview": {
            "description": "Analyze and interpret complex data to help organizations make decisions",
            "demand": "Very High",
            "workEnvironment": "Office or remote, data-driven teams"
        },
        "skills": {
            "technical": ["Data Analysis", "Machine Learning", "Statistics"],
            "soft": ["Analytical Thinking", "Communication", "Problem-solving"]
        },
        "salary": {
            "entryLevel": 85000,
            "midLevel": 125000,
            "seniorLevel": 165000
        },
        "growth": {
            "outlook": "Excellent",
            "growthRate": "36% (Much faster than average)"
        }
    },
    "Graphic Designer": {
        "overview": {
            "description": "Create visual concepts to communicate ideas that inspire and inform",
            "demand": "Moderate",
            "workEnvironment": "Creative studios or freelance"
        },
        "skills": {
            "technical": ["Graphic Design", "Illustration", "Typography"],
            "soft": ["Creativity", "Attention to Detail", "Time Management"]
        },
        "salary": {
            "entryLevel": 45000,
            "midLevel": 65000,
            "seniorLevel": 85000
        },
        "growth": {
            "outlook": "Good",
            "growthRate": "3% (As fast as average)"
        }
    },
    "Marketing Manager": {
        "overview": {
            "description": "Plan and execute marketing strategies to promote products/services",
            "demand": "High",
            "workEnvironment": "Office setting, fast-paced environment"
        },
        "skills": {
            "technical": ["Marketing Strategy", "Data Analysis", "Digital Marketing"],
            "soft": ["Leadership", "Communication", "Creativity"]
        },
        "salary": {
            "entryLevel": 60000,
            "midLevel": 90000,
            "seniorLevel": 120000
        },
        "growth": {
            "outlook": "Good",
            "growthRate": "10% (Faster than average)"
        }
    },
    "Doctor": {
        "overview": {
            "description": "Diagnose and treat patients' illnesses and injuries",
            "demand": "Very High",
            "workEnvironment": "Hospitals, clinics, or private practice"
        },
        "skills": {
            "technical": ["Medical Knowledge", "Diagnosis", "Treatment Planning"],
            "soft": ["Empathy", "Communication", "Decision Making"]
        },
        "salary": {
            "entryLevel": 60000,
            "midLevel": 150000,
            "seniorLevel": 250000
        },
        "growth": {
            "outlook": "Excellent",
            "growthRate": "13% (Faster than average)"
        }
    },
    "Environmental Scientist": {
        "overview": {
            "description": "Research and develop solutions to environmental problems",
            "demand": "Moderate",
            "workEnvironment": "Fieldwork and office settings"
        },
        "skills": {
            "technical": ["Environmental Analysis", "Research Methods", "Data Collection"],
            "soft": ["Problem-solving", "Critical Thinking", "Communication"]
        },
        "salary": {
            "entryLevel": 50000,
            "midLevel": 70000,
            "seniorLevel": 90000
        },
        "growth": {
            "outlook": "Good",
            "growthRate": "8% (Faster than average)"
        }
    }
}


@app.route('/api/insights', methods=['POST'])
def get_career_insights():
    data = request.json
    career = data.get('career')
    insights = CAREER_INSIGHTS.get(career, {})
    return jsonify(insights)

if __name__ == '__main__':
    app.run(debug=True)
