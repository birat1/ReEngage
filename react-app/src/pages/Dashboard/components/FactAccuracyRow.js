import AnimalFact from "../../../components/AnimalFacts/AnimalFact";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BarChart3 } from "lucide-react";


function FactAccuracyRow({englishPercentage, mathPercentage, sciencePercentage}) {
    const parsePercentage = (value) => {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? 0 : parsed;
    };

    const englishPercenFloat = parsePercentage(englishPercentage);
    const mathPercenFloat = parsePercentage(mathPercentage);
    const sciencePercenFloat = parsePercentage(sciencePercentage);

    const averageAccuracy = (sciencePercenFloat + mathPercenFloat + englishPercenFloat)/3;
    console.log("average accuracy" + averageAccuracy);
    console.log("Received percentages:", { englishPercentage, mathPercentage, sciencePercentage });
    const renderMessage = () => {
        if (averageAccuracy > 70) {
            return "Amazing! You're a star!";
        } else if (averageAccuracy > 50) {
            return "Good job! Keep practicing!";
        } else {
            return " Keep trying, you'll get better!";
        }
    }

    //finds game with the lowest percentage
    const lowestSubject = () => {
        const subjects = [
            { name: "Fill-it Fish", percentage: englishPercenFloat },
            { name: "StarMath", percentage: mathPercenFloat },
            { name: "LabWars", percentage: sciencePercenFloat }
        ];

        let lowest = subjects[0];
        for (let i = 1; i < subjects.length; i++) {
            if (subjects[i].percentage < lowest.percentage) {
                lowest = subjects[i];
            }
        }

        return lowest.name;
    }

    const getEncouragement = () => {
        const game = lowestSubject();
        const phrases = [
            `Let’s play ${game} next – you’ll ace it! 🎮`,
            `Ready to level up your ${game} skills? 🚀`,
            `How about a round of ${game}? You’ve got this! 💪`,
            `Time to conquer ${game}! Want to try? 🏆`,
            `Psst… ${game} could use your superpowers! 🦸`
          ];
        
        return phrases[Math.floor(Math.random() * phrases.length)];
    }

    return (
        <div className="row">
            <AnimalFact/>
            <div className='col-md-6 mb-3'>
              <div className='bg-white shadow-sm p-4 rounded h-100'>
                <div className='d-flex align-items-center mb-2'>
                  <BarChart3 size={24} color="#3498db" className='text-primary me-2' />
                  <h6 className='mb-0'>Your Average Accuracy</h6>
                </div>
                <div className='text-center'>
                  <div className='display-6 text-primary fw-bold'>
                    <span style={{ color: "#3498db" }}>{(averageAccuracy).toFixed(1)}%</span>
                  </div>
                  <p className='mb-0'>{renderMessage()}</p>
                  <p className='text-muted small mt-2'>
                    {getEncouragement()}
                  </p>
                </div>
              </div>
            </div>
          </div>
    );
}

export default FactAccuracyRow;