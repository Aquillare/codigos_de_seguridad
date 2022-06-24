import React from "react";

const SECURITY_CODE='paradigma';

function UseState({name}){

    const [state,setState] = React.useState({
        error:false,
        value:'',
        loading:false,
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
                        loading:false
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
}

export{UseState};