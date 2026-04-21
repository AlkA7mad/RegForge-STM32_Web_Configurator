import Dropdown from "../../components/Dropdown/Dropdown";

function Configurator () {

    return (
        <>
        <div>
            <h1>MCUGen – STM32 Configurator</h1>
            <div className="configuration"></div>
            {/* <label>{ Dropdown name }</label>  */}
            <Dropdown
            // pros
            />
            <div className="generatedCode"></div>
        </div>
        </>
    )

}

export default Configurator;