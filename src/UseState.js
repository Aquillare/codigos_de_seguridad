import React from "react";

const SECURITY_CODE='paradigma';

function UseState({name}){

    const [state,setState] = React.useState({
        error:false,
        value:'',
        loading:false,
        deleted:false,
        confirmed:false,
    });

    //Definiremos funciones que que actualizaran los estados, para trabajar de forma semi declarativa.

    function onConfirm(){
        setState({
            ...state,
            error:false,
            loading:false,
            confirmed:true,
        }); 
    };

    function onError(){
        setState({
            ...state,
            error:true,
            loading:false
        }); 
    };

    function onDeleted(){
        setState({
            ...state,
            deleted:true,
        })
    };

    function onWrite(newValue){
        setState({
            ...state,
            value:newValue,
        });
    };

    function onCheck(){
        setState({
            ...state,
            loading:true,
        })
    };

    function onReset(){
        setState({
            ...state,
            deleted:false,
            confirmed:false,
        })
    };




    React.useEffect( () => {

        if(state.loading){
            setState({
                ...state,
                error:false,
            });

            setTimeout( () => {

                if(state.value === SECURITY_CODE){
                   onConfirm();
                }else{
                    onError();
                }

                console.log(state)
            }, 3000);
        }

    }, [state.loading]);

    if(!state.deleted && !state.confirmed){
        return (
            <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor escribe el código de seguridad</p>
    
            {state.error && (
                <p>Error: el código es incorrecto</p>
            )}
    
            {state.loading && (
                <p>Cargando...</p>
            )}
    
            <input
                placeholder="Código de seguridad"
                value={state.value}
                onChange={(event)=>{
                    onWrite(event.target.value)
                }}
            />
    
            <button
                onClick={ () =>
                    onCheck()
                }
            >Comprobar</button>
            </div>
        );
    }else if(!!state.confirmed && !state.deleted){
        return(
            <>
                <h2>Eliminar {name}</h2>
                <p>¿Seguro de que deseas eliminar UseState?</p>

                <button
                    onClick={ () =>
                        onDeleted()
                    }
                >
                    Sí, eliminar
                </button>

                <button
                    onClick={ () =>
                        onReset()
                    }
                >
                    No, volver
                </button>
            </>
        )
    }else{
        return(
            <>
                <h2>{name} fue eliminado</h2>
                <p>Eliminado con éxito</p>
                <button
                    onClick={ () => 
                        onReset()
                    }
                >
                    Recuperar UseState
                </button>
            </>
        )    
    }
}

export{UseState};