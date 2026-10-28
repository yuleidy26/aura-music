export const estadocancion = $state ({
    actual: null
})

export const actualizarCancion = (nuevacancion) => {
    estadocancion.actual = nuevacancion

}