import BodyText from "@enact/sandstone/BodyText";
import Sprite from "@enact/sandstone/Sprite";
import { Cell } from "@enact/ui/Layout";

const Loading = () => {

    return(
        <div>
            <Cell>
            <BodyText centered>
                Please wait ...
            </BodyText> 
            </Cell>
        </div>
    );
}

export default Loading;