import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({title, score}:{title:string, score:number}) =>{
    return (
        <div className={'resume-summary'}>
            <div className={'category'}>
                <div className={'flex flex-row gap-4 items-center justify-center'}>
                    <p className={'text-2xl'}>{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className={'text-2xl font-semibold text-dark-200'}>
                    {score}/100
                </p>
            </div>
        </div>
    )
}

const Summary = ({feedback}:{
    feedback: Feedback
}) =>{
    return (
        <div className={'bg-white rounded-2xl shadow-md w-full'}>
            <div className={'flex flex-row items-center p-4 gap-8'}>
                <ScoreGauge score={feedback.overallScore}/>
                <div className={'flex flex-col gap-2'}>
                    <h2 className={'text-2xl font-bold'}>Your Resume Score</h2>
                    <p className={'text-sm text-gray-500'}>
                        This score is calculated based on the feedback provided by AI below.
                    </p>
                </div>
            </div>
            <Category title={"Tone & Style"} score={feedback.toneAndStyle.score}/>
            <Category title={"Content"} score={feedback.content.score}/>
            <Category title={"Structure"} score={feedback.structure.score}/>
            <Category title={"Skills"} score={feedback.skills.score}/>
        </div>
    )
}
export default Summary;