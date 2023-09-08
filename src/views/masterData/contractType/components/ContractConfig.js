import { AdaptableCard } from 'components/shared';
import {Input,Button,Select,FormItem,FormContainer,} from 'components/ui'
import { Field, FieldArray, Form, Formik } from 'formik'
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { HiMinus, HiPlus } from 'react-icons/hi';

const pCategoryOptions = [
    { label: 'Customer Type', value: '1' },
    { label: 'Customer Category', value: '2' },
    { label: 'Country', value: '3' },
    { label: 'State', value: '4' },
]

const ContractConfig = ({ onChange, refId, ...props }) => {

    const { errors, touched, values ,setFieldValue} = props
    return (
        <>
        <FieldArray name='dgl_md_contract_type_configs'>
            {({push : pushConfig,remove: removeConfig}) => (
                <div>
                    {values.dgl_md_contract_type_configs.map((itemConfig,index) => {
                        return(
                            <>
                            <AdaptableCard className="h-full p-6 pb-20" style={{backgroundColor:"#F5F5F5"}} bodyClass="h-full" divider>
                                <FormContainer>
                                    <FormItem label="Title" className='w-1/2 mt-4 mb-8' 
                                        invalid={errors.config_title && touched.config_title}
                                        errorMessage={errors.config_title}>
                                        <Field type="text" autoComplete="off" placeholder="Enter Config Title" component={Input}
                                            name={`dgl_md_contract_type_configs[${index}].config_title`}
                                        />
                                    </FormItem>
                                    <div className="flex justify-around pt-3 w-24 h-12 mt-6 mb-5 border rounded  bg-blue-900">
                                        <span className='text-white'>IF</span>
                                    </div>
                                    <FieldArray name={`dgl_md_contract_type_configs[${index}].config_details.configIf`}>
                                    {({push : pushSection,remove: removeSection}) => (
                                        <div>
                                            {itemConfig?.config_details?.configIf.map((f,fi) => {
                                                return (
                                                    <AdaptableCard className="h-full pl-36 pt-4" bodyClass="h-full" >
                                                        <div key={fi} style={{marginBottom:"-20px"}}>
                                                            <div className="md:grid grid-cols-6 gap-4 ">
                                                                <FormItem label="" invalid={errors.select &&touched.select} errorMessage={errors.select}>
                                                                    <Field name={`dgl_md_contract_type_configs[${index}].config_details.configIf[${fi}].select`}>
                                                                    {({field,form,}) => (
                                                                        <Select placeholder="Select" field={field} form={form} options={pCategoryOptions}
                                                                            value={pCategoryOptions.filter((cItem) =>cItem.value === values.dgl_md_contract_type_configs[index].config_details.configIf[ fi].select)}
                                                                            onChange={(cItem) =>form.setFieldValue(field.name,cItem.value)}
                                                                        />
                                                                    )}
                                                                    </Field>
                                                                </FormItem>

                                                                <FormItem label=""  invalid={errors.interAction &&touched.interAction} errorMessage={errors.interAction}>
                                                                    <Field name={`dgl_md_contract_type_configs[${index}].config_details.configIf[${fi}].interAction`}>
                                                                        {({field,form,}) => (
                                                                            <Select placeholder="Select Interaction" field={field} form={form} options={pCategoryOptions}
                                                                                value={pCategoryOptions.filter((cItem) =>cItem.value === values.dgl_md_contract_type_configs[index].config_details.configIf[fi].interAction)}
                                                                                onChange={(cItem) =>form.setFieldValue(field.name,cItem.value)}
                                                                            />
                                                                        )}
                                                                    </Field>
                                                                </FormItem>

                                                                <FormItem label="" invalid={errors.selectValue &&touched.selectValue} errorMessage={errors.selectValue}>
                                                                    <Field name={`dgl_md_contract_type_configs[${index}].config_details.configIf[${fi}].selectValue`}>
                                                                        {({field,form,}) => (
                                                                            <Select placeholder="Select Value" field={field} form={form} options={pCategoryOptions}
                                                                                value={pCategoryOptions.filter((cItem) =>cItem.value ===values.dgl_md_contract_type_configs[index].config_details.configIf[fi].selectValue)}
                                                                                onChange={(cItem) =>form.setFieldValue(field.name,cItem.value)}
                                                                            />
                                                                        )}
                                                                    </Field>
                                                                </FormItem>

                                                                <FormItem label="" invalid={errors.input1 &&touched.input1} errorMessage={errors.input1}>
                                                                    <Field type="text" autoComplete="off" placeholder=""component={Input}
                                                                        name={`dgl_md_contract_type_configs[${index}].config_details.configIf[${fi}].input1`}
                                                                    />
                                                                </FormItem>

                                                                <FormItem label="" invalid={errors.input2 &&touched.input2} errorMessage={errors.input2}>
                                                                    <Field type="text" autoComplete="off" placeholder="" component={Input}
                                                                        name={`dgl_md_contract_type_configs[${index}].config_details.configIf[${fi}].input2`}
                                                                    />
                                                                </FormItem>

                                                                <div className='flex gap-4'>
                                                                    <Button className='ml-4 border-cyan-500' shape="circle" size="md"icon={<HiPlus/>}
                                                                        type='button' onClick={() => pushSection({select: "",interAction : "",selectValue : "",input1:"",input2:""})}
                                                                    />
                                                                    {itemConfig.config_details.configIf.length >1 &&
                                                                    <Button className='border-red-500' shape="circle" size="md" icon={<HiMinus/>}
                                                                        type='button' onClick={() => removeSection(fi)}
                                                                    />}                                                               
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </AdaptableCard>
                                                )
                                            })}
                                        </div>
                                    )}
                                    </FieldArray>
                                    <div className="flex justify-around pt-3 w-24 h-12 mt-16 mb-5 border rounded  bg-blue-900">
                                        <span className='text-white'>THEN</span>
                                    </div>
                                    <FieldArray name={`dgl_md_contract_type_configs[${index}].config_details.configThen`}>
                                    {({push : pushSection,remove: removeSection}) => (
                                        <div>
                                            {itemConfig.config_details.configThen.map((f,fi) => {
                                                return (
                                                    <AdaptableCard className="h-full pl-36 pt-4" bodyClass="h-full" >
                                                        <div key={fi} style={{marginBottom:"-20px"}}>
                                                            <div className="md:grid grid-cols-6 gap-4 ">
                                                                <FormItem label="" invalid={errors.select && touched.select} errorMessage={errors.select}>
                                                                    <Field name={`dgl_md_contract_type_configs[${index}].config_details.configThen[${fi}].select`}>
                                                                    {({field,form,}) => (
                                                                        <Select placeholder="Select" field={field} form={form} options={pCategoryOptions}
                                                                            value={pCategoryOptions.filter((cItem) =>cItem.value === values.dgl_md_contract_type_configs[index].config_details.configThen[ fi].select)}
                                                                            onChange={(cItem) =>form.setFieldValue(field.name,cItem.value)}
                                                                        />
                                                                    )}
                                                                    </Field>
                                                                </FormItem>

                                                                <FormItem label=""  invalid={errors.interAction &&touched.interAction} errorMessage={errors.interAction}>
                                                                    <Field name={`dgl_md_contract_type_configs[${index}].config_details.configThen[${fi}].interAction`}>
                                                                        {({field,form,}) => (
                                                                            <Select placeholder="Select Interaction" field={field} form={form} options={pCategoryOptions}
                                                                                value={pCategoryOptions.filter((cItem) =>cItem.value === values.dgl_md_contract_type_configs[index].config_details.configThen[fi].interAction)}
                                                                                onChange={(cItem) =>form.setFieldValue(field.name,cItem.value)}
                                                                            />
                                                                        )}
                                                                    </Field>
                                                                </FormItem>

                                                                <FormItem label="" invalid={errors.selectValue &&touched.selectValue} errorMessage={errors.selectValue}>
                                                                    <Field name={`dgl_md_contract_type_configs[${index}].config_details.configThen[${fi}].selectValue`}>
                                                                        {({field,form,}) => (
                                                                            <Select placeholder="Select Value" field={field} form={form} options={pCategoryOptions}
                                                                                value={pCategoryOptions.filter((cItem) =>cItem.value ===values.dgl_md_contract_type_configs[index].config_details.configThen[fi].selectValue)}
                                                                                onChange={(cItem) =>form.setFieldValue(field.name,cItem.value)}
                                                                            />
                                                                        )}
                                                                    </Field>
                                                                </FormItem>

                                                                <FormItem label="" invalid={errors.input1 &&touched.input1} errorMessage={errors.input1}>
                                                                    <Field type="text"autoComplete="off" placeholder="" component={Input}
                                                                        name={`dgl_md_contract_type_configs[${index}].config_details.configThen[${fi}].input1`}
                                                                    />
                                                                </FormItem>
                                                                <FormItem label="" invalid={errors.input2 &&touched.input2} errorMessage={errors.input2}>
                                                                    <Field type="text" autoComplete="off" placeholder="" component={Input}
                                                                        name={`dgl_md_contract_type_configs[${index}].config_details.configThen[${fi}].input2`}
                                                                    />
                                                                </FormItem>
                                                                
                                                                <div className='flex gap-4'>
                                                                    <Button className='ml-4 border-cyan-500' shape="circle" size="md"icon={<HiPlus/>}
                                                                        type='button' onClick={() => pushSection({select: "",interAction : "",selectValue : "",input1:"",input2:""})}
                                                                    />
                                                                    {itemConfig?.config_details?.configThen.length >1 &&
                                                                    <Button className='border-red-500' shape="circle" size="md" icon={<HiMinus/>}
                                                                        type='button' onClick={() => removeSection(fi)}
                                                                    />}                                                  
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </AdaptableCard>
                                                )
                                            })}
                                        </div>
                                    )}
                                    </FieldArray>
                                </FormContainer>
                            </AdaptableCard>
                            <div className="mt-2 mb-2 text-right lg:flex items-center justify-end">
                                <Button type='button' onClick={()=>pushConfig({
                                                config_title: "",
                                                config_details: {
                                                    configIf:[{select: "",interAction : "",selectValue : "",input1:"",input2:""}],
                                                    configThen:[{select: "",interAction : "",selectValue : "",input1:"",input2:""}]
                                                }})}
                                    variant="plain" className='font-bold' style={{ color: "#004D99" }} 
                                    icon={<BsFillPlusCircleFill fill='#004D99' />}>
                                        ADD NEW CONFIG
                                </Button>
                                {values.dgl_md_contract_type_configs.length > 1 && 
                                <Button type='button' onClick={() => removeConfig(index)}
                                    variant="plain" className='font-bold' style={{ color: "#990000" }} 
                                    icon={<BsFillPlusCircleFill fill='#990000' />}>
                                        DELETE CONFIG
                                </Button>}
                            </div>
                            </>
                        )})}
                </div>
            )}
        </FieldArray>
        </>
    )
}

export default ContractConfig
