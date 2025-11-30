interface ICheckBox{
    lable: string
}


function CheckBox(props: ICheckBox) {

    return(
        <div>
            <input type="checkbox"
                className="translate-0.5 mr-1.5"/>
            <label className="text-sm font-bold">{props.lable}</label>
        </div>
    )
}

export default CheckBox;