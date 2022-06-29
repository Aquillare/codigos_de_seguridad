import React from "react";

const SECURITY_CODE='paradigma';

const initialState = {
    value:'',
    error:false,
    loading:false,
    deleted:false,
    confirmed:false,
}

const actionTypes = {
    confirmed:'CONFIRMED',
    error:'ERROR',
    write:'WRITE',
    check:'CHECK',
    deleted:'DELETED',
    reset:'RESET',
}

const reducer = (state, action) => {
    switch(action.type){
        case actionTypes.confirmed:
            return{
                ...state,
                error:false,
                loading:false,
                confirmed:true,
            };
        case actionTypes.error:
            return{
                ...state,
                error:true,
                loading:false,
            };
        case actionTypes.deleted:
            return{
                ...state,
                deleted:true,
            };
        case actionTypes.write:
            return{
            ...state,
            value:action.payload,
        };
        case actionTypes.check:
            return{
                ...state,
                loading:true,
            };
        case actionTypes.reset:
            return{
                ...state,
                deleted:false,
                confirmed:false,
            };
        default:{
            return{
                ...state,
            }
        };      
    }
}

function UseReducer({name}){

    const [state,dispatch] = React.useReducer(reducer, initialState)

    React.useEffect( () => {

        if(state.loading){

            setTimeout( () => {

                if(state.value === SECURITY_CODE){
                   dispatch({
                       type: actionTypes.confirmed
                   });
                }else{
                    dispatch({
                        type:actionTypes.error
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
    
            {(state.error && !state.loading ) && (
                <p>Error: el código es incorrecto</p>
            )}
    
            {state.loading && (
                <p>Cargando...</p>
            )}
    
            <input
                placeholder="Código de seguridad"
                value={state.value}
                onChange={(event)=>{
                    dispatch({
                        type: actionTypes.write,
                        payload: event.target.value,
                    });
                }}
            />
    
            <button
                onClick={ () =>
                    dispatch({
                        type:actionTypes.check,
                    })
                }
            >Comprobar</button>
            </div>
        );
    }else if(!!state.confirmed && !state.deleted){
        return(
            <>
                <h2>Eliminar {name}</h2>
                <p>¿Seguro de que deseas eliminar UseReducer?</p>

                <button
                    onClick={ () =>
                        dispatch({
                            type:actionTypes.deleted
                        })
                    }
                >
                    Sí, eliminar
                </button>

                <button
                    onClick={ () =>
                        dispatch({
                            type:actionTypes.reset
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
                        dispatch({
                            type:actionTypes.reset
                        })
                    }
                >
                    Recuperar useReducer
                </button>
            </>
        )    
    }
}

export{UseReducer};