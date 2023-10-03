import React from "react";
import styles from './styles.module.css';
import { useForm } from "react-hook-form";
import feedback_controls from './feedback_controls';

function Feedback(){
    const { handleSubmit, register } = useForm();

    const createSubmit=(requestdata)=>{
    };

    return(
        <div className={styles.main}>
            <h2>please submit your feedback</h2>
            <form onSubmit={handleSubmit(createSubmit)}>
            <div className={styles.star}></div>
            <div className={styles.field_container}>
                {feedback_controls.map((control) => (
                    <div className={styles.input_wrapper} key={control.name}>
                        <label>{control.label}</label>
                        {control.type === 'select' ? (
                            <select className={styles.changes}{...register(control.name, control.rules)} defaultValue="">
                                <option value="" disabled>
                                {control.placeholder}
                                </option>
                                {control.option.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={control.type}
                                {...register(control.name, control.rules)}
                                placeholder={control.placeholder}
                            />
                        )}
                    </div>
                ))}
                <div>
                    <button type="submit">Submit</button>
                </div>
            
            </div>
        </form>
        </div>
    )
};
export default Feedback;