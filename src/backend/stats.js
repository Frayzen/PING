import words from "../../public/words.json";

export function adjustBoost(boost, factor=1, inc=true)
{
    if (inc)
        boost = Math.min(boost + factor, 5);
    else
        boost = Math.max(boost - factor, -5);
    return boost;

}

export const createKeySequenceHandler = ( updateFunc, setKeySequence) => {
    return (event) => {
        const key = event.key;
        setKeySequence(prevSequence => {
            const newSequence = [...prevSequence, key].slice(-Math.max(...words.map(seq => seq.length)));
            const matchedSequence = words.find(seq => newSequence.join('').endsWith(seq));
            if (matchedSequence) {
                updateFunc();
                return [];
            }
            return newSequence;
        });
    };
};
