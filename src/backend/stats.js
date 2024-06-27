export function adjustBoost(boost, factor=1.1, inc=true)
{
    if (inc)
        boost = Math.min(boost * factor, 0.75);
    else
        boost = Math.max(boost / factor, 1.25);
    return boost;

}
