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


    React.useEffect( () => {

        if(state.loading){
            setState({
                ...state,
                error:false,
            });

            setTimeout( () => {

                if(state.value === SECURITY_CODE){
                    setState({
                        ...state,
                        error:false,
                        loading:false,
                        confirmed:true,
                    }); 
                }else{
                    setState({
                        ...state,
                        error:true,
                        loading:false
                    }); 
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
                    setState({
                        ...state,
                        value:event.target.value,
                    });
                }}
            />
    
            <button
                onClick={() => setState({
                    ...state,
                    loading:true,
                })}
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
                        setState({
                            ...state,
                            deleted:true,
                        })
                    }
                >
                    Sí, eliminar
                </button>

                <button
                    onClick={ () =>
                        setState({
                            ...state,
                            confirmed:false,
                        })
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
                        setState({
                            ...state,
                            deleted:false,
                            confirmed:false,
                        })
                    }
                >
                    Recuperar UseState
                </button>
            </>
        )    
    }
}

export{UseState};