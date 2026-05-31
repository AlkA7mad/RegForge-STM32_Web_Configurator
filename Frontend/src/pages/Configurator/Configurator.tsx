import Code from "../../components/Code/Code";
import Configs from "../../components/Configs/Configs";
import Selector from "../../components/Selector/Selector";


function Configurator() {

  return(
    <>
    <div className="outerpage">
      <div className="selector">
        <Selector>

        </Selector>
      </div>
      <div className="configurator">
        <Configs>

        </Configs>
      </div>
      <div className="code">
        <Code>

        </Code>
      </div>
    </div>
    </>
  )
}

export default Configurator;
