import {ComponentProps, default as React} from "react";

interface ITitleProps extends ComponentProps<any> {
  spendableXP: number;
}

function RenderTitle(props: ITitleProps) {
  return <h3>Purchase Skills <span className='remaining-xp'>({props.spendableXP} XP remaining)</span></h3>
}


export default RenderTitle;