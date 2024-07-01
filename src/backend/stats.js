export function adjustBoost(boost, factor=1, inc=true)
{
    if (inc)
        boost = Math.min(boost + factor, 5);
    else
        boost = Math.max(boost - factor, -5);
    return boost;

}
