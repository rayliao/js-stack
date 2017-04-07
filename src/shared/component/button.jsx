import React from 'react'

const Button = props => {
    const { label, handleClick } = props
    return <button className="btn btn-primary" type="button" role="button" onClick={handleClick}>{label}</button>
}

export default Button