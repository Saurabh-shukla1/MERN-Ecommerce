
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";


const CommonForm = ({ formControls, 
    formData, 
    setFormData, 
    onSubmit, 
    buttonText,
    isButtonDisabled
}) => {

    const renderInputByComponentType = (getControlItem) => {
        let element = null;
        const value = formData[getControlItem.name] || '';

        switch (getControlItem.componentType) {
            case 'input':
                element = (
                    <Input 
                        name={getControlItem.name}
                        type={getControlItem.type}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        value={value}
                        onChange={(event) => 
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value
                            })
                        }
                    />
                );
                break;

                case 'textarea':
                element = (
                   <Textarea 
                       name={getControlItem.name}
                       placeholder={getControlItem.placeholder}
                       id={getControlItem.name}
                        value={value}
                        onChange={(event) => 
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value
                            })
                        }
                   />
                );
                break;

                case 'select':
                element = (
                    <Select onValueChange={(value) => 
                        setFormData({
                            ...formData,
                            [getControlItem.name]: value
                        })
                    } value={value}>
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder={getControlItem.label}/>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                getControlItem.Options &&
                                getControlItem.Options.length > 0 ?
                                getControlItem.Options.map((optionItem) => (<SelectItem key={optionItem.id} value={optionItem.id}>
                                    {optionItem.label}
                                </SelectItem>)):null
                            }
                        </SelectContent>
                    </Select>
                );
                break;
        
            default:
                element = (
                    <Input 
                        name={getControlItem.name}
                        type={getControlItem.type}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        value={value}
                        onChange={(event) => 
                            setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value
                            })
                        }
                    />
                );
                break;
        }
        return element;
    }

    return(
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {
                    formControls.map(controlItem => <div key={controlItem.name} className="w-full grid gap-1.5">
                        <Label className="mb-1">{controlItem.label}</Label>
                        {
                            renderInputByComponentType(controlItem)
                        }
                    </div>)
                }
            </div>
            <Button disabled={isButtonDisabled} type="submit" className="mt-2 w-full">{buttonText || "Submit"}</Button>
        </form>
    )
}
export default CommonForm;