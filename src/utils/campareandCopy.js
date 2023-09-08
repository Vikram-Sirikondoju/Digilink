import dayjs from "dayjs";
import { apiGetVarientsByItem } from "services/SolutionsService";

export default function campareandCopy(InitialValues, secondObject) {
  function findAndReplace(obj, targetAttr, replacement) {
    // Base case: if the object is not an object or is null, return
    if (typeof obj !== 'object' || obj === null) {
      return;
    }

    // Check each key in the object
    for (const key in obj) {
      if (obj?.hasOwnProperty(key)) {
        // If the attribute matches the target attribute, replace the value
        if (key === targetAttr) {

          if (replacement) {
            let datestring = replacement + "";
            const regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\?.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/g;
            const found = datestring?.match(regex);

            if (found) {
              replacement =
                dayjs(
                  replacement,
                  'YYYY-MM-DD'
                )?.toDate()


            }
          }


          obj[key] = replacement;
          return;
        }

        // If the value is an object, recursively call the function
        if (typeof obj[key] === 'object') {
          findAndReplace(obj[key], targetAttr, replacement);
        }
      }
    }
  }


  function iterateNestedObject(obj) {
    for (const key in obj) {
      if (obj?.hasOwnProperty(key)) {
        const value = obj[key];

        // If the value is an object, recursively call the function
        if (typeof value === 'object' && value !== null) {
          iterateNestedObject(value);
        } else {
          // Perform desired operations on the attribute
          //console?.log(`Attribute: ${key}, Value: ${value}`);
          findAndReplace(InitialValues, key, value);

        }
      }
    }
  }


  // findAndReplace(opInitialValues, 'accName', 'dinesh');

  iterateNestedObject(secondObject);
}

export const EditandCopy = (operatorIntialValues, rowForEdit) => {
  operatorIntialValues.accInfo.accName = rowForEdit?.acc_name
  operatorIntialValues.accInfo.accMnoParentId = rowForEdit?.acc_parent
  operatorIntialValues.accInfo.accIncorpDt = dayjs(
    rowForEdit?.acc_incorp_dt,
    'YYYY-MM-DD'
  )?.toDate()
  operatorIntialValues.accInfo.accCompName = rowForEdit?.acc_comp_name
  operatorIntialValues.accInfo.accTaxId = rowForEdit?.acc_tax_id
  operatorIntialValues.accInfo.accCurrency = rowForEdit?.acc_currency
  operatorIntialValues.accInfo.accLang = rowForEdit?.acc_lang
  operatorIntialValues.accInfo.accTimeZone = rowForEdit?.acc_time_zone
  operatorIntialValues.accInfo.accOrient = rowForEdit?.acc_orient
  operatorIntialValues.accInfo.fields = rowForEdit?.dgl_acc_mno_custom_fields?.filter(item => item.field_type === "ACCOUNT")
  //operatorIntialValues.ContactInfo.accPrimContName = rowForEdit?.acc_prim_cont
  operatorIntialValues.ContactInfo.custFirstName = rowForEdit?.acc_first_name
  operatorIntialValues.ContactInfo.custMiddleName = rowForEdit?.acc_middle_name
  operatorIntialValues.ContactInfo.custLastName = rowForEdit?.acc_last_name
  operatorIntialValues.ContactInfo.fieldsContact = rowForEdit?.dgl_acc_mno_custom_fields?.filter(item => item.field_type === "CONTACT")
  
  
  operatorIntialValues.ContactInfo.accEmailId = rowForEdit?.acc_email_id
  operatorIntialValues.ContactInfo.accPrimCont = rowForEdit?.acc_phone
  operatorIntialValues.ContactInfo.accAltCont = rowForEdit?.acc_alt_cont
  operatorIntialValues.ContactInfo.accFax = rowForEdit?.acc_fax
  operatorIntialValues.ContactInfo.accWebUrl = rowForEdit?.acc_web_url
  operatorIntialValues.address.accCountry = rowForEdit?.acc_country
  operatorIntialValues.address.accAddL1 = rowForEdit?.acc_add_l1
  operatorIntialValues.address.accAddL2 = rowForEdit?.acc_add_l2
  operatorIntialValues.address.accCity = rowForEdit?.acc_city
  operatorIntialValues.address.accState = rowForEdit?.acc_state
  operatorIntialValues.address.accZipcode = rowForEdit?.acc_zipcode
  operatorIntialValues.billing.accUsername = rowForEdit?.acc_username
  operatorIntialValues.billing.accPassword = rowForEdit?.acc_password
  operatorIntialValues.billing.accEndPointUrl = rowForEdit?.acc_end_point_url
  operatorIntialValues.billing.accSftpAdd = rowForEdit?.acc_sftp_add
  operatorIntialValues.billing.accPortNo = rowForEdit?.acc_port_no
  operatorIntialValues.billing.sameCorrespondenceAddress = rowForEdit?.acc_is_billing_centre

  operatorIntialValues.userInfo.firstName = rowForEdit?.dgl_acc_users[0]?.first_name
  operatorIntialValues.userInfo.lastName = rowForEdit?.dgl_acc_users[0]?.last_name
  operatorIntialValues.userInfo.emailId = rowForEdit?.dgl_acc_users[0]?.email
  operatorIntialValues.userInfo.phoneNumber = rowForEdit?.dgl_acc_users[0]?.phone


  operatorIntialValues.permissionInfo.publicRole = rowForEdit?.dgl_roles[0]?.public_role_id
  operatorIntialValues.permissionInfo.userRole = rowForEdit?.dgl_roles[0]?.role_name
  operatorIntialValues.permissionInfo.description = rowForEdit?.dgl_roles[0]?.role_desc
  // operatorIntialValues.uploadFiles = rowForEdit?.dgl_mno_files?.filter((vl)=>vl?.file_type === 'upload')
  operatorIntialValues.additionalFiles = rowForEdit?.dgl_mno_files?.filter((vl)=>vl?.file_type === 'additional')
  if(operatorIntialValues?.additionalFiles?.length == 0){
    operatorIntialValues.additionalFiles = [
      {
          file_name: "",
          file_url: "",
          file_type: "",
          dgl_acc_mno_id: null
      }
  ]
  }

  return operatorIntialValues;

}

export  const RetailEditandCopy=(retailIntialValues, rowForEdit)=> {

  retailIntialValues.retailAccInitValues.custName = rowForEdit?.cust_name
  retailIntialValues.retailAccInitValues.customerType = rowForEdit?.cust_parent
  retailIntialValues.retailAccInitValues.custCompName = rowForEdit?.cust_comp_name
  retailIntialValues.retailAccInitValues.custIncorpDt = dayjs(
    rowForEdit?.cust_incorp_dt,
    'YYYY-MM-DD'
  )?.toDate()

  retailIntialValues.retailAccInitValues.custTaxId = rowForEdit?.cust_tax_id
  retailIntialValues.retailAccInitValues.custTimeZone = rowForEdit?.cust_time_zone
  retailIntialValues.retailAccInitValues.custCurrency = rowForEdit?.cust_currency
  retailIntialValues.retailAccInitValues.custLang = rowForEdit?.cust_lang
  retailIntialValues.retailAccInitValues.custOrient = rowForEdit?.cust_orient
  retailIntialValues.retailAccInitValues.fields = rowForEdit?.dgl_cust_custom_fields?.filter(item => item.field_type === "ACCOUNT")
  retailIntialValues.retailAccInitValues.custCat = rowForEdit?.dgl_md_cust_cat_id

  
  retailIntialValues.retailContactInitValues.custFirstName = rowForEdit?.cust_first_name
  retailIntialValues.retailContactInitValues.custMiddleName = rowForEdit?.cust_middle_name
  retailIntialValues.retailContactInitValues.custLastName = rowForEdit?.cust_last_name
  retailIntialValues.retailContactInitValues.custEmailId = rowForEdit?.cust_email_id
  retailIntialValues.retailContactInitValues.custPhone = rowForEdit?.cust_phone_number
  retailIntialValues.retailContactInitValues.custAltCont = rowForEdit?.cust_alt_cont
  retailIntialValues.retailContactInitValues.custFax = rowForEdit?.cust_fax
  retailIntialValues.retailContactInitValues.custWebUrl = rowForEdit?.cust_web_url
  retailIntialValues.retailContactInitValues.fieldsContact = rowForEdit?.dgl_cust_custom_fields?.filter(item => item.field_type === "Contact")
  retailIntialValues.addressFields.custCountry = rowForEdit?.cust_country
  retailIntialValues.addressFields.custAddL1 = rowForEdit?.cust_add_l1
  retailIntialValues.addressFields.custAddL2 = rowForEdit?.cust_add_l2
  retailIntialValues.addressFields.custCity = rowForEdit?.cust_city
  retailIntialValues.addressFields.custState = rowForEdit?.cust_state
  retailIntialValues.addressFields.custZipcode = rowForEdit?.cust_zipcode
  retailIntialValues.retailUserInitValues.firstName = rowForEdit?.dgl_cust_users[0]?.first_name
  retailIntialValues.retailUserInitValues.lastName = rowForEdit?.dgl_cust_users[0]?.last_name
  retailIntialValues.retailUserInitValues.middleName = rowForEdit?.dgl_cust_users[0]?.middle_name
  retailIntialValues.retailUserInitValues.emailId = rowForEdit?.dgl_cust_users[0]?.email
  retailIntialValues.retailUserInitValues.phoneNumber = rowForEdit?.dgl_cust_users[0]?.phone
  retailIntialValues.retailUserInitValues.ordemailId = rowForEdit?.cust_order_approver_email_id


  // retailIntialValues.uploadFiles = rowForEdit?.dgl_cust_files?.filter((vl)=>vl?.file_type === 'upload')
  retailIntialValues.additionalFiles = rowForEdit?.dgl_cust_files?.filter((vl)=>vl?.file_type === 'additional')

  if(retailIntialValues?.additionalFiles?.length == 0){
    retailIntialValues.additionalFiles = [
      {
          file_name: "",
          file_url: "",
          file_type: "",
          dgl_acc_mno_id: null
      }
  ]
  }

  return retailIntialValues

}


export const   EditandCopyEnterprise = (EpIntialValues, rowForEdit) => {

  //EpIntialValues.entContact.customerType=rowForEdit?.cust_parent
  EpIntialValues.entAccInfo.accMnoParentId = rowForEdit?.cust_parent
  EpIntialValues.entAccInfo.custName = rowForEdit?.cust_name
  EpIntialValues.entAccInfo.customerType = rowForEdit?.dgl_acc_mno_id
  EpIntialValues.entAccInfo.custCompName = rowForEdit?.cust_comp_name
  EpIntialValues.entAccInfo.custIncorpDt = dayjs(rowForEdit?.cust_incorp_dt, 'YYYY-MM-DD')?.toDate()
  EpIntialValues.entAccInfo.custTaxId = rowForEdit?.cust_tax_id
  EpIntialValues.entAccInfo.custTimeZone = rowForEdit?.cust_time_zone
  EpIntialValues.entAccInfo.custCurrency = rowForEdit?.cust_currency
  EpIntialValues.entAccInfo.custLang = rowForEdit?.cust_lang
  EpIntialValues.entAccInfo.custOrient = rowForEdit?.cust_orient
  EpIntialValues.entAccInfo.custCat = rowForEdit?.dgl_md_cust_cat_id
  EpIntialValues.entAccInfo.fields = rowForEdit?.dgl_cust_custom_fields?.filter(item => item.field_type === "ACCOUNT")

  EpIntialValues.entContact.custFirstName = rowForEdit?.cust_first_name
  EpIntialValues.entContact.custMiddleName = rowForEdit?.cust_middle_name
  EpIntialValues.entContact.custLastName = rowForEdit?.cust_last_name
  EpIntialValues.entContact.custPrimCont = rowForEdit?.cust_prim_cont
  EpIntialValues.entContact.custEmailId = rowForEdit?.cust_email_id
  EpIntialValues.entContact.custAltCont = rowForEdit?.cust_alt_cont
  EpIntialValues.entContact.custFax = rowForEdit?.cust_fax
  EpIntialValues.entContact.custWebUrl = rowForEdit?.cust_web_url
  EpIntialValues.entContact.custPhone = rowForEdit?.cust_phone_number
  EpIntialValues.entContact.custordEmailId = rowForEdit?.cust_order_approver_email_id
  EpIntialValues.entContact.fieldsContact = rowForEdit?.dgl_cust_custom_fields?.filter(item => item.field_type === "Contact")
  EpIntialValues.address.custCountry = rowForEdit?.cust_country
  EpIntialValues.address.custAddL1 = rowForEdit?.cust_add_l1
  EpIntialValues.address.custAddL2 = rowForEdit?.cust_add_l2
  EpIntialValues.address.custCity = rowForEdit?.cust_city
  EpIntialValues.address.custState = rowForEdit?.cust_state
  EpIntialValues.address.custZipcode = rowForEdit?.cust_zipcode
  EpIntialValues.billing.billCycle = rowForEdit?.bill_cycle
  EpIntialValues.billing.billDate = rowForEdit?.bill_date
  EpIntialValues.billing.billDueTenor = rowForEdit?.bill_due_tenor
  EpIntialValues.billing.creditLimit = rowForEdit?.credit_limit
  EpIntialValues.billing.sameCorrespondenceAddress = rowForEdit?.is_business_unit
  EpIntialValues.userInfo.roleId = rowForEdit?.dgl_cust_roles[0]?.id
  EpIntialValues.userInfo.firstName = rowForEdit?.dgl_cust_users[0]?.first_name
  EpIntialValues.userInfo.lastName = rowForEdit?.dgl_cust_users[0]?.last_name
  EpIntialValues.userInfo.middleName = rowForEdit?.dgl_cust_users[0]?.middle_name
  EpIntialValues.userInfo.emailId = rowForEdit?.dgl_cust_users[0]?.email
  EpIntialValues.userInfo.phoneNumber = rowForEdit?.dgl_cust_users[0]?.phone
  EpIntialValues.userContact.contractType = rowForEdit?.dgl_cust_contracts[0]?.dgl_md_contract_type_id
  EpIntialValues.userContact.signedDate = dayjs(rowForEdit?.dgl_cust_contracts[0]?.signed_date, 'YYYY-MM-DD')?.toDate()
  EpIntialValues.userContact.enforceDate = dayjs(rowForEdit?.dgl_cust_contracts[0]?.enforce_date, 'YYYY-MM-DD')?.toDate()
  EpIntialValues.userContact.terminateDate = dayjs(rowForEdit?.dgl_cust_contracts[0]?.terminate_date, 'YYYY-MM-DD')?.toDate()
  EpIntialValues.userContact.status = rowForEdit?.dgl_cust_contracts[0]?.status
  //EpIntialValues.uploadFiles = rowForEdit?.dgl_cust_files?.filter((vl)=>vl?.file_type === 'upload')
  EpIntialValues.additionalFiles = rowForEdit?.dgl_cust_files?.filter((vl)=>vl?.file_type === 'additional')


  if(EpIntialValues?.additionalFiles?.length == 0){
    EpIntialValues.additionalFiles = [
      {
          file_name: "",
          file_url: "",
          file_type: "",
          dgl_acc_mno_id: null
      }
  ]
  }

  return EpIntialValues;
}


export const PartnerEditandCopy = (prtnerIntialValues, rowForEdit) => {

  prtnerIntialValues.accInfo.operater = rowForEdit?.acc_parent
  prtnerIntialValues.accInfo.accName = rowForEdit?.acc_name
  prtnerIntialValues.accInfo.accCompName = rowForEdit?.acc_comp_name
  prtnerIntialValues.accInfo.accIncorpDt = dayjs(rowForEdit?.acc_incorp_dt, 'YYYY-MM-DD')?.toDate()
  prtnerIntialValues.accInfo.accTaxId = rowForEdit?.acc_tax_id
  prtnerIntialValues.accInfo.accTimeZone = rowForEdit?.acc_time_zone
  prtnerIntialValues.accInfo.accCurrency = rowForEdit?.acc_currency
  prtnerIntialValues.accInfo.accLang = rowForEdit?.acc_lang
  prtnerIntialValues.accInfo.accOrient = rowForEdit?.acc_orient
  prtnerIntialValues.accInfo.partnerType = rowForEdit?.partner_type

  prtnerIntialValues.accInfo.apiConfig = rowForEdit?.acc_api_config

  prtnerIntialValues.accInfo.fields = rowForEdit?.dgl_acc_mno_custom_fields?.filter(item => item.field_type === "ACCOUNT")

  prtnerIntialValues.ContactInfo.accFirstName = rowForEdit?.acc_first_name
  prtnerIntialValues.ContactInfo.accMiddleName = rowForEdit?.acc_middle_name

  prtnerIntialValues.ContactInfo.accLastName = rowForEdit?.acc_last_name
  prtnerIntialValues.ContactInfo.accEmailId = rowForEdit?.acc_email_id
  prtnerIntialValues.ContactInfo.accPrimCont = rowForEdit?.acc_phone
  prtnerIntialValues.ContactInfo.accAltCont = rowForEdit?.acc_alt_cont
  prtnerIntialValues.ContactInfo.accFax = rowForEdit?.acc_fax
  prtnerIntialValues.ContactInfo.accWebUrl = rowForEdit?.acc_web_url
  prtnerIntialValues.ContactInfo.fielContacts = rowForEdit?.dgl_acc_mno_custom_fields?.filter(item => item.field_type === "CONTACT")
  prtnerIntialValues.address.accCountry = rowForEdit?.acc_country
  prtnerIntialValues.address.accAddL1 = rowForEdit?.acc_add_l1
  prtnerIntialValues.address.accAddL2 = rowForEdit?.acc_add_l2
  prtnerIntialValues.address.accCity = rowForEdit?.acc_city
  prtnerIntialValues.address.accState = rowForEdit?.acc_state
  prtnerIntialValues.address.accZipcode = rowForEdit?.acc_zipcode

  prtnerIntialValues.settlementInfo.prefSettleType = rowForEdit?.pref_settle_type
  prtnerIntialValues.settlementInfo.billCycle = rowForEdit?.bill_cycle
  prtnerIntialValues.settlementInfo.billDate = rowForEdit?.bill_date
  prtnerIntialValues.settlementInfo.billDueTenor = rowForEdit?.bill_due_tenor
  prtnerIntialValues.settlementInfo.bankAccNum = rowForEdit?.bank_acc_num
  prtnerIntialValues.settlementInfo.bankName = rowForEdit?.bank_name
  prtnerIntialValues.settlementInfo.bankBranchName = rowForEdit?.bank_branch_name
  prtnerIntialValues.settlementInfo.ifscCode = rowForEdit?.ifsc_code
  prtnerIntialValues.settlementInfo.micrCode = rowForEdit?.micr_code
  prtnerIntialValues.settlementInfo.uploadCancelledCheque = rowForEdit?.upload_cancel_cheque

  prtnerIntialValues.userInfo.firstName = rowForEdit?.dgl_acc_users[0]?.first_name
  prtnerIntialValues.userInfo.lastName = rowForEdit?.dgl_acc_users[0]?.last_name
  prtnerIntialValues.userInfo.emailId = rowForEdit?.dgl_acc_users[0]?.email
  prtnerIntialValues.userInfo.phoneNumber = rowForEdit?.dgl_acc_users[0]?.phone
  prtnerIntialValues.userInfo.middleName = rowForEdit?.dgl_acc_users[0]?.middle_name
  prtnerIntialValues.contractInfo.contractType = rowForEdit?.dgl_contracts[0]?.dgl_md_contract_type_id
  prtnerIntialValues.contractInfo.signedDate = dayjs(rowForEdit?.dgl_contracts[0]?.signed_date, 'YYYY-MM-DD')?.toDate()
  prtnerIntialValues.contractInfo.enforcementDate = dayjs(rowForEdit?.dgl_contracts[0]?.enforce_date, 'YYYY-MM-DD')?.toDate()
  prtnerIntialValues.contractInfo.terminationDate = dayjs(rowForEdit?.dgl_contracts[0]?.terminate_date, 'YYYY-MM-DD')?.toDate()
  prtnerIntialValues.contractInfo.contractStatus = rowForEdit?.dgl_contracts[0]?.status
  prtnerIntialValues.contractInfo.contractFile = rowForEdit?.dgl_contracts[0]?.contract_file

  prtnerIntialValues.masterInfoPermission.userRole = rowForEdit.dgl_roles[0]?.role_name
  prtnerIntialValues.masterInfoPermission.description = rowForEdit.dgl_roles[0]?.role_desc
  prtnerIntialValues.masterInfoPermission.publicRole = rowForEdit.dgl_roles[0]?.public_role_id

  //prtnerIntialValues.uploadFiles = rowForEdit?.dgl_mno_files?.filter((vl)=>vl?.file_type === 'upload')
  prtnerIntialValues.additionalFiles = rowForEdit?.dgl_mno_files?.filter((vl)=>vl?.file_type === 'additional')
  if(prtnerIntialValues?.additionalFiles?.length == 0){
    prtnerIntialValues.additionalFiles = [
      {
          file_name: "",
          file_url: "",
          file_type: "",
          dgl_acc_mno_id: null
      }
  ]
  }
  return prtnerIntialValues
}

export const EditValuesToFieldsForProvider = (provideIntialValues, rowData) => {

  console.log('EditValuesToFieldsForProvider',rowData,provideIntialValues)
  provideIntialValues.accInfo.accType = rowData.acc_parent
  provideIntialValues.accInfo.accName = rowData.acc_name
  provideIntialValues.accInfo.accIncorpDt = dayjs(rowData.acc_incorp_dt, 'YYYY-MM-DD')?.toDate()
  provideIntialValues.accInfo.accCompName = rowData.acc_comp_name
  provideIntialValues.accInfo.accTaxId = rowData.acc_tax_id

  provideIntialValues.accInfo.prodCategory = rowData.prod_cat_id
  provideIntialValues.accInfo.accCurrency = rowData.acc_currency
  provideIntialValues.accInfo.accLang = rowData.acc_lang
  provideIntialValues.accInfo.accTimeZone = rowData.acc_time_zone
  provideIntialValues.accInfo.accOrient = rowData.acc_orient
  provideIntialValues.accInfo.fields = rowData?.dgl_acc_mno_custom_fields?.filter(item => item.field_type === "ACCOUNT")


  provideIntialValues.ContactInfo.accPrimeContFirstName = rowData.acc_first_name
  provideIntialValues.ContactInfo.accPrimeContMidName = rowData.acc_middle_name
  provideIntialValues.ContactInfo.accPrimeContLastName = rowData.acc_last_name
  provideIntialValues.ContactInfo.fieldsContact = rowData?.dgl_acc_mno_custom_fields?.filter(item => item.field_type === "CONTACT")


  provideIntialValues.ContactInfo.accEmailId = rowData.acc_email_id
  provideIntialValues.ContactInfo.accPrimCont = rowData.acc_phone
  provideIntialValues.ContactInfo.accAltCont = rowData.acc_alt_cont
  provideIntialValues.ContactInfo.accFax = rowData.acc_fax
  provideIntialValues.ContactInfo.accWebUrl = rowData.acc_web_url

  provideIntialValues.address.accCountry = rowData.acc_country
  provideIntialValues.address.accAddL1 = rowData.acc_add_l1
  provideIntialValues.address.accAddL2 = rowData.acc_add_l2
  provideIntialValues.address.accCity = rowData.acc_city
  provideIntialValues.address.accState = rowData.acc_state
  provideIntialValues.address.accZipcode = rowData.acc_zipcode

  provideIntialValues.settlementInfo.bankAccNum = rowData.bank_acc_num
  provideIntialValues.settlementInfo.bankBranchName = rowData.bank_branch_name
  provideIntialValues.settlementInfo.bankName = rowData.bank_name
  provideIntialValues.settlementInfo.billCycle = rowData.bill_cycle
  provideIntialValues.settlementInfo.billDate =rowData.bill_date
  provideIntialValues.settlementInfo.billDueTenor = rowData.bill_due_tenor
  provideIntialValues.settlementInfo.ifscCode = rowData.ifsc_code
  provideIntialValues.settlementInfo.micrCode = rowData.micr_code
  provideIntialValues.settlementInfo.prefSettleType = rowData.pref_settle_type
  provideIntialValues.settlementInfo.uploadCancelledCheque = rowData.upload_cancel_cheque

  provideIntialValues.userInfo.roleId = ''
  provideIntialValues.userInfo.firstName = rowData.dgl_acc_users[0]?.first_name
  provideIntialValues.userInfo.lastName = rowData.dgl_acc_users[0]?.last_name
  provideIntialValues.userInfo.emailId = rowData.dgl_acc_users[0]?.email
  provideIntialValues.userInfo.phoneNumber = rowData.dgl_acc_users[0]?.phone
  provideIntialValues.userInfo.middleName = rowData.dgl_acc_users[0]?.middle_name


  provideIntialValues.contractInfo.contractType = rowData.dgl_contracts[0]?.dgl_md_contract_type_id
  provideIntialValues.contractInfo.signedDate = dayjs(rowData.dgl_contracts[0]?.signed_date, 'YYYY-MM-DD')?.toDate()
  provideIntialValues.contractInfo.enforcementDate = dayjs(rowData.dgl_contracts[0]?.enforce_date, 'YYYY-MM-DD')?.toDate()
  provideIntialValues.contractInfo.terminationDate = dayjs(rowData.dgl_contracts[0]?.terminate_date, 'YYYY-MM-DD')?.toDate()
  provideIntialValues.contractInfo.contractStatus = rowData.dgl_contracts[0]?.status
  provideIntialValues.contractInfo.contractFile = rowData.dgl_contracts[0]?.contract_file


  provideIntialValues.masterInfoPermission.userRole = rowData.dgl_roles[0]?.role_name
  provideIntialValues.masterInfoPermission.description = rowData.dgl_roles[0]?.role_desc
  provideIntialValues.masterInfoPermission.publicRole = rowData.dgl_roles[0]?.public_role_id

  // provideIntialValues.uploadFiles = rowData?.dgl_mno_files?.filter((vl)=>vl?.file_type === 'upload')
  provideIntialValues.additionalFiles = rowData?.dgl_mno_files?.filter((vl)=>vl?.file_type === 'additional')
  if(provideIntialValues?.additionalFiles?.length == 0){
    provideIntialValues.additionalFiles = [
      {
          file_name: "",
          file_url: "",
          file_type: "",
          dgl_acc_mno_id: null
      }
  ]
  }
  return provideIntialValues
}

export const EditandCopyUsers = (userIntialValues, rowForEdit) => {

  userIntialValues.firstName = rowForEdit.first_name
  userIntialValues.lastName = rowForEdit.last_name
  userIntialValues.email = rowForEdit.email
  userIntialValues.phone = rowForEdit.phone
  userIntialValues.profileImg = rowForEdit.profile_img
  userIntialValues.addL1 = rowForEdit.add_line1
  userIntialValues.addL2 = rowForEdit.add_line2
  userIntialValues.city = rowForEdit.city
  userIntialValues.state = rowForEdit.state
  userIntialValues.country = rowForEdit.country
  userIntialValues.zipcode = rowForEdit.zipcode
  userIntialValues.status = rowForEdit.status
  userIntialValues.dgl_acc_mno_id = rowForEdit.dgl_acc_mno_id
  userIntialValues.role = rowForEdit.dgl_roles_id
  userIntialValues.language = rowForEdit.language
  userIntialValues.orientation = rowForEdit.orientation
  userIntialValues.timeZone = parseInt(rowForEdit.time_zone)
  return userIntialValues
}

export const TemplateEditCopy = (prtnerIntialValues, rowForEdit) => {

  
  prtnerIntialValues.tempDetails = {
    category: rowForEdit?.rel_prod_cat_id,
    title: rowForEdit?.tp_title,
    type: rowForEdit?.tp_type,
    description: rowForEdit?.tp_desc,
  }

  if (rowForEdit?.tp_struc !== undefined) {
    prtnerIntialValues.initialValues = JSON.parse(rowForEdit.tp_struc);
  } else {
    prtnerIntialValues.initialValues = null; // Or you can assign a default value if needed
  }

  return prtnerIntialValues
}

export const EditandCopyProdCat = (prodCatIntialValues, rowForEdit) => {


  prodCatIntialValues.prodCatTitle = rowForEdit.prod_cat_title
  prodCatIntialValues.description = rowForEdit.prod_cat_desc
  prodCatIntialValues.imageFile = rowForEdit.prod_cat_img_url
  prodCatIntialValues.acc_unq_id = rowForEdit.unq_id

  return prodCatIntialValues

}
export const EditValuesToFields = (initialState,rowData) => {
  initialState=initialState?JSON.parse(JSON.stringify(initialState)):initialState

  initialState.accountType= rowData?.acc_type
  initialState.policyTitle = rowData?.policy_name
  initialState.maxFileSize = rowData?.maximum_file_size
  initialState.maxNoOfFiles = rowData?.mximunm_no_of_files
  initialState.filesToBeUploaded = JSON.parse(rowData.doc_type).map(e => {
    let obj={}
    obj.docType = e.doc_type_id
    obj.mandatoryOrOptional = (e.is_mandatory === true) ? 'mandatory' : 'optional'
    return obj
  })
  return initialState
}

export const RolePermitEditValuesToFields = (initialState,rowData) => {
  initialState=initialState?JSON.parse(JSON.stringify(initialState)):initialState
  initialState.publicRole = rowData.public_role_id
  initialState.userRole = rowData.role_name
  initialState.description =  rowData.role_desc

  return initialState
}

export const EditvaluesToFieldUserRole = (initialState,rowForEdit) => {
  initialState.userRole = rowForEdit.role_name
  initialState.description = rowForEdit.role_desc

  return initialState
}

export const EditandCopydocType = (docTypeIntialValues,rowForEdit) => {
  docTypeIntialValues.title = rowForEdit?.doc_type_title
  docTypeIntialValues.description = rowForEdit?.doc_type_desc
  docTypeIntialValues.acc_unq_id = rowForEdit?.unq_id
  return docTypeIntialValues
}

export const EditandCopyNotifications = (notificationIntialValues,rowForEdit) => {
  notificationIntialValues.ntf_tp_type = rowForEdit?.ntf_tp_type
  notificationIntialValues.ntf_tp_name = rowForEdit?.ntf_tp_name
  notificationIntialValues.ntf_tp_info = rowForEdit?.ntf_tp_info
  return notificationIntialValues
}
export const EditandCopyTax = (taxIntialValues, rowForEdit) => {

  taxIntialValues.id = rowForEdit.id


  return taxIntialValues
}


export const CustCategoryEditandCopy = (custIntialValues, rowForEdit) => {

  custIntialValues.title = rowForEdit.cust_cat_title
  custIntialValues.description=rowForEdit.cust_cat_desc
  custIntialValues.acc_unq_id = rowForEdit.unq_id

  return custIntialValues
}

export const apiUpdatcust = (custIntialValues, rowForEdit) => {

  custIntialValues.title = rowForEdit.cust_cat_title
  custIntialValues.description=rowForEdit.cust_cat_desc


  return custIntialValues
}


export const CurrencyEditandCopy = (currIntialValues, rowForEdit) => {

  currIntialValues.curTitle = rowForEdit.cur_title
  currIntialValues.curSymbol=rowForEdit.cur_symbol
  currIntialValues.curConvRate=rowForEdit.cur_conv_rate
  currIntialValues.oneUsd=rowForEdit.one_usd
  currIntialValues.acc_unq_id = rowForEdit.unq_id

  return currIntialValues
}

export const EditValuesToFieldsPassPolicy = (initialState,rowData) => {

  initialState=initialState?JSON.parse(JSON.stringify(initialState)):initialState

  initialState.id = rowData.id
  initialState.policyName = rowData.policy_name
  initialState.roleId = rowData.role_id
  initialState.passwordExpDays = rowData.password_exp_days
  initialState.minLength = rowData.min_length
  initialState.maxLength = rowData.max_length
  initialState.allowUpper = rowData.allow_upper
  initialState.allowLower = rowData.allow_lower
  initialState.allowNum = rowData.allow_num
  initialState.allowSpel = rowData.allow_spel
  initialState.unSuccAttmts = rowData.un_succ_attmts
  // initialState.preNumCheck = rowData.pre_num_check

  return initialState
}

export const EditandCopyTaxComp = (taxCompInitVal, rowForEdit) => {
    taxCompInitVal.title = rowForEdit.tax_comp_title
    taxCompInitVal.description = rowForEdit.tax_comp_desc
    taxCompInitVal.placement = rowForEdit.tax_comp_ded_type
    taxCompInitVal.acc_unq_id = rowForEdit.unq_id
  
    return taxCompInitVal
  
  }

  export const EditandCopyTemplate = (notificationIntialValues,rowForEdit) => {
    notificationIntialValues.type = rowForEdit?.ntf_tp_type
    notificationIntialValues.title = rowForEdit?.ntf_tp_name
    notificationIntialValues.template = rowForEdit?.ntf_tp_info
    return notificationIntialValues
  }

  export const EditFieldsToContractType = (initialValues,rowForEdit) => {

    // initialValues=initialValues?JSON.parse(JSON.stringify(initialValues)):initialValues

    initialValues.contract_type_desc = rowForEdit.contract_type_desc
    initialValues.contract_type_title = rowForEdit.contract_type_title
    initialValues.cust_cat = rowForEdit.cust_cat
    initialValues.is_event = rowForEdit.is_event
    initialValues.md_contr_status =  rowForEdit.md_contr_status
    initialValues.acc_unq_id = rowForEdit.unq_id


    initialValues.dgl_md_contract_type_configs = rowForEdit.dgl_md_contract_type_configs.map(e => ({
      ...e,
      config_details: JSON.parse(e.config_details)
    }))

    return initialValues
  }
  
  export const EditandCopyPages = (pagesIntialValues, rowForEdit) => {

    // prodCatIntialValues.prodCatTitle = rowForEdit.prod_cat_title
    // prodCatIntialValues.description = rowForEdit.prod_cat_desc
    pagesIntialValues.pageName = rowForEdit.page_name
    pagesIntialValues.description = rowForEdit.page_content
    pagesIntialValues.metaTitle = rowForEdit.meta_title
    pagesIntialValues.metaKeywords = rowForEdit.meta_data
    pagesIntialValues.metaDescription = rowForEdit.meta_description
    pagesIntialValues.acc_unq_id = rowForEdit.unq_id

  
    return pagesIntialValues
  
  }

  export const SettingsEditValuesToFileds = (rowForEdit,genSetInitValues) => {

    // settingInitValues=settingInitValues?JSON.parse(JSON.stringify(settingInitValues)):settingInitValues
    
    genSetInitValues.gen_set_rndoff_val = rowForEdit.gen_set_rndoff_val === true ?  "up" : "down"
    genSetInitValues.gen_set_date_format = rowForEdit.gen_set_date_format
    genSetInitValues.gen_set_lang_pref = rowForEdit.gen_set_lang_pref
    genSetInitValues.gen_set_measr_unit = rowForEdit.gen_set_measr_unit === true ?  "ci" : "si"
    genSetInitValues.gen_set_time_format = rowForEdit.gen_set_time_format
    genSetInitValues.gen_set_timezone = parseInt(rowForEdit.gen_set_timezone)
    genSetInitValues.rel_gen_set_curncy_pref = rowForEdit.rel_gen_set_curncy_pref
    genSetInitValues.gen_set_tokenvalue = rowForEdit.gen_set_tokenvalue
    genSetInitValues.post_ent_cust_wait = rowForEdit.post_ent_cust_wait
    genSetInitValues.sales_exec_wait = rowForEdit.sales_exec_wait
    genSetInitValues.retail_cust_wait = rowForEdit.retail_cust_wait
    genSetInitValues.pre_ent_cust_wait = rowForEdit.pre_ent_cust_wait

    return genSetInitValues
  }

  export const ApiToUiConversionWareHouse = (userIntialValues, rowForEdit) => {
    userIntialValues.id = rowForEdit.id
    userIntialValues.whUnqId = rowForEdit.wh_unq_id
    userIntialValues.whTitle = rowForEdit.wh_title
    userIntialValues.whLocation = rowForEdit.wh_location
    userIntialValues.whAddressLine1 = rowForEdit.wh_address_line1
    userIntialValues.whAddressLine2 = rowForEdit.wh_address_line2
    userIntialValues.whCity = rowForEdit.wh_city
    userIntialValues.whState = rowForEdit.wh_state
    userIntialValues.whCountry = rowForEdit.wh_country
    userIntialValues.whZipCode = rowForEdit.wh_zip_code
    userIntialValues.whContactPerson = rowForEdit.wh_contact_person
    userIntialValues.whEmailId = rowForEdit.wh_email_id
    userIntialValues.whPhoneNumber = rowForEdit.wh_phone_number
    userIntialValues.whAlternatePhoneNumber = rowForEdit.wh_alternate_phone_number
    userIntialValues.whTotalCapacity = rowForEdit.wh_total_capacity
    userIntialValues.whAllottedCapacity = rowForEdit.wh_allotted_capacity
    userIntialValues.whDescription = rowForEdit.wh_description
    userIntialValues.accId = rowForEdit.acc_id
    userIntialValues.whLatitude = rowForEdit.wh_latitude
    userIntialValues.whLongitude = rowForEdit.wh_longitude
    userIntialValues.whStatus = rowForEdit.wh_status
    return userIntialValues
  }
  export const UiToApiConversionWareHouse = (submitValues, formData, edit=false) => {
    if(edit){
      submitValues.id = formData.id
      submitValues.wh_unq_id = formData.whUnqId
    }
    submitValues.wh_title = formData.whTitle
    submitValues.wh_location = formData.whLocation
    submitValues.wh_address_line1 = formData.whAddressLine1
    submitValues.wh_address_line2 = formData.whAddressLine2
    submitValues.wh_city = formData.whCity
    submitValues.wh_state = formData.whState
    submitValues.wh_country = formData.whCountry
    submitValues.wh_zip_code = formData.whZipCode
    submitValues.wh_contact_person = formData.whContactPerson
    submitValues.wh_email_id = formData.whEmailId
    submitValues.wh_phone_number = formData.whPhoneNumber
    submitValues.wh_alternate_phone_number = formData.whAlternatePhoneNumber
    submitValues.wh_total_capacity = formData.whTotalCapacity
    submitValues.wh_allotted_capacity = formData.whAllottedCapacity
    submitValues.wh_description = formData.whDescription
    submitValues.acc_id = formData.accId
    submitValues.wh_status = formData.whStatus
    submitValues.wh_latitude = formData.whLatitude || "lat1"
    submitValues.wh_longitude = formData.whLongitude || "lat2"
    submitValues.is_preferred = 1
    return submitValues
  }
  
  
  export const ApiToUiConversionInventory = (userIntialValues, rowForEdit) => {
    userIntialValues.id = rowForEdit.id;
    userIntialValues.whWarehouse = rowForEdit.wh_warehouse || rowForEdit.dgl_wh_warehouse;
    userIntialValues.catItemsInfo = rowForEdit.cat_items_info;
    userIntialValues.catItemVar = rowForEdit.cat_item_var;
    userIntialValues.skuCode = rowForEdit.sku_code;
    userIntialValues.shelfCode = rowForEdit.shelf_code;
    userIntialValues.shelfArea = rowForEdit.shelf_area;
    userIntialValues.holdingQty = rowForEdit.holding_qty;
    userIntialValues.movingQty = rowForEdit.moving_qty;
    userIntialValues.manufacturer = rowForEdit.manufacturer;
    userIntialValues.blockedQty = rowForEdit.blocked_qty;
    return userIntialValues
  }
  export const UiToApiConversionInventory = (submitValues, formData, edit=false) => {
    if(edit){
      submitValues.id = formData.id
      submitValues.wh_id = formData.whWarehouse
      submitValues.item_id = formData.catItemsInfo
      submitValues.item_variant_id = formData.catItemVar
    }else{
      submitValues.wh_warehouse = formData.whWarehouse
      submitValues.cat_items_info = formData.catItemsInfo
      submitValues.cat_item_var = formData.catItemVar
    }
    submitValues.sku_code = formData.skuCode
    submitValues.shelf_code = formData.shelfCode
    submitValues.shelf_area = formData.shelfArea
    submitValues.holding_qty = formData.holdingQty
    submitValues.moving_qty = formData.movingQty || 0
    submitValues.manufacturer = formData.manufacturer || "MANUFACTURER"
    submitValues.blocked_qty = formData.blockedQty || 0
    return submitValues
  }
  
  const getVarients=async(cItemType)=>{
    const response =await apiGetVarientsByItem(cItemType)
    let ddValues = []
    if (response.status === 'success') {
       ddValues = response.data.data.response.map((product) => (
        {
            value: product.id,
            label: product.item_var_title,
        }
    ));
    return ddValues
    }
    return []
  }

  
  const mergeSolItems = (solItems) => {
    let result = [];
    
    let arrayforCitemType = [];
    let indexForInsert 
    for (const solItem of solItems) {
      const cItemType = solItem.cItemType;
      if(arrayforCitemType.includes(cItemType)){
        result.map((e,ind)=>{
           if (e.cItemType == cItemType)  {
            indexForInsert = ind
           }  
        })
        result[indexForInsert].solItems.push(solItem.solItems[0])
      }else{
          arrayforCitemType.push(cItemType);
          result.push(solItem)
      }
    }
    return result;
  };

  export const EditandCopySol =async (initialValues, rowForEdit) => {
     initialValues.basics.solTitle = rowForEdit.sol_title;
     initialValues.basics.solDesc = rowForEdit.sol_desc;
     initialValues.basics.solKeywords = rowForEdit.sol_keywords;
     initialValues.basics.solTextBanner = rowForEdit.sol_text_banner;
     initialValues.basics.imageFile = rowForEdit.sol_img_url;
     initialValues.basics.pCategory = rowForEdit.dgl_rel_prod_cat_ids[0]?.rel_prod_cat_id || '';
     initialValues.basicOther.zipCode = rowForEdit.zipCode;
     initialValues.basicOther.upload = rowForEdit.upload;


     let  solCreate = []
     for (let index = 0; index < rowForEdit?.dgl_cat_sol_items?.length; index++) {
      
      let temp= await getVarients(rowForEdit?.dgl_cat_sol_items[index].item.id);

      let k = {
        solItemType: rowForEdit?.dgl_cat_sol_items[index].item.item_type, 
        cItemType: rowForEdit?.dgl_cat_sol_items[index].item.id, 
        solItems: [
          {
            solVariant: rowForEdit?.dgl_cat_sol_items[index].item_var.id,
            solParentVariant: rowForEdit?.dgl_cat_sol_items[index].sol_item_parent_item,
            solPrice: rowForEdit?.dgl_cat_sol_items[index].sol_display_item_var_price,
            defaultSolPrice: rowForEdit?.dgl_cat_sol_items[index].sol_display_item_var_price,
            solDiscount: '', 
            isDep: rowForEdit?.dgl_cat_sol_items[index].sol_item_is_dep
          }
        ],
        paymentProvAvailable: false,
        emiCheck: false, 
        emiArr: [], 
        chooseItems: [], 
        chooseVarients: temp
      }
      solCreate.push(k)
     }

    // const result = mergeSolItemsAndGetResult(solCreate);
    console.log(solCreate)
    let result = mergeSolItems(solCreate);
    console.log(result)
     initialValues.solCreate.initialValues = result;
     return initialValues;
   };

export const itemEditFieldsToState = (intials,rowForEdit) => {

  intials.itemTemplate.productCat = rowForEdit.rel_prod_cat_id
  intials.itemTemplate.tempItemType = rowForEdit.item_type
  intials.itemTemplate.selectedTemplate = rowForEdit.dgl_cat_tp_info.id

  intials.itemBasicDetails.itemTitle = rowForEdit.item_title
  intials.itemBasicDetails.itemDesc = rowForEdit.item_desc
  intials.itemBasicDetails.sopFileUrl = rowForEdit.item_sop_url
  intials.itemBasicDetails.uploadImageUrl = rowForEdit.item_thumbnail
  intials.itemBasicDetails.taxData = rowForEdit.dgl_cat_item_taxes.length > 0 ? rowForEdit.dgl_cat_item_taxes.map(e => {
    let a = {}
    a.taxComponents = e.tax_id
    a.taxAmount = e.tax_value
    a.taxType = e.tax_comp_ded_type

    return a
  }) : [{taxComponents: '',taxAmount: '',taxType : '',}]

  intials.itemVarients = rowForEdit.dgl_cat_item_vars.map(e =>{
    let a = {}
    a.item_var_title = e.item_var_title
    a.item_var_desc = e.item_var_desc
    a.var_def_price = e.var_def_price
    a.img_url = e.img_url
    a.media_url = e.media_url
    a.section = JSON.parse(e.tp_struc_info)
    a.srt_desc = e.srt_desc
    a.validity = e.validity

    return a
  })
return intials
}

export const UiToApiConversionShipment=(dataItem)=>{
  const obj={
    "shippment_id": dataItem?.shippment_id,
    "dispatchdate": dataItem?.dispatchdate,
    "delivery_partner": dataItem?.delivery_partner,
    "doc_id": dataItem?.doc_id,
    "wo_info_id": dataItem?.wo_info_id,
    "wo_shippment_status":  dataItem?.wo_shippment_status,
    "dgl_wo_shippment_address": [
      {
        "add_title": "DelivaryAddresses",
        "shippment_add_line1":dataItem?.shippment_add_line1,
        "shippment_add_line2": dataItem?.shippment_add_line2,
        "shippment_add_city":dataItem?.shippment_add_city,
        "shippment_add_state": dataItem?.shippment_add_state,
        "shippment_add_country":dataItem?.shippment_add_country,
        "shippment_add_zipcode": dataItem?.shippment_add_zipcode,
        "shippment_add_latitude": dataItem?.shippment_add_latitude,
        "shippment_add_longitude": dataItem?.shippment_add_longitude,
        "shippment_add_type": 'DELIVARY',
        "shippment_add_other_info": dataItem?.shippment_add_other_info,
      },
      {
        "add_title": "PickupAddresses",
        "shippment_add_line1": dataItem?.pickup_add_line1,
        "shippment_add_line2": dataItem?.pickup_add_line2,
        "shippment_add_city": dataItem?.pickup_add_city,
        "shippment_add_state": dataItem?.pickup_add_state,
        "shippment_add_country":dataItem?.pickup_add_country,
        "shippment_add_zipcode": dataItem?.pickup_add_zipcode,
        "shippment_add_latitude": dataItem?.pickup_add_latitude,
        "shippment_add_longitude": dataItem?.pickup_add_longitude,
        "shippment_add_type": 'PICKUP',
        "shippment_add_other_info": dataItem?.pickup_add_other_info,
      }
    ]
  }
  return obj
}
export const APiToUiConversionShipment=(dataItem)=>{
  const pickupDetails=dataItem?.dgl_wo_shippment_address?.find(i=>i?.shippment_add_type==='PICKUP')
  const delivaryDetails=dataItem?.dgl_wo_shippment_address?.find(i=>i?.shippment_add_type==='DELIVARY')
  const obj={
    ...dataItem,
    "shippment_id": dataItem?.shippment_id,
    "dispatchdate": dataItem?.dispatchdate,
    "delivery_partner": dataItem?.delivery_partner,
    "doc_id": dataItem?.doc_id,
    "wo_info_id": dataItem?.wo_info_id,
    "wo_shippment_status":  dataItem?.wo_shippment_status,
    "shippment_add_line1": delivaryDetails?.shippment_add_line1,
    "shippment_add_line2": delivaryDetails?.shippment_add_line2,
    "shippment_add_country": delivaryDetails?.shippment_add_country,
    "shippment_add_state": delivaryDetails?.shippment_add_state,
    "shippment_add_city": delivaryDetails?.shippment_add_city,
    "shippment_add_zipcode": delivaryDetails?.shippment_add_zipcode,
    "shippment_add_longitude": delivaryDetails?.shippment_add_longitude,
    "shippment_add_latitude": delivaryDetails?.shippment_add_latitude,
    "shippment_add_type": "DELIVERY",
    "shippment_add_other_info":delivaryDetails?.shippment_add_other_info,
    "pickup_add_line1": pickupDetails?.shippment_add_line1,
    "pickup_add_line2": pickupDetails?.shippment_add_line2,
    "pickup_add_country": pickupDetails?.shippment_add_country,
    "pickup_add_state": pickupDetails?.shippment_add_state,
    "pickup_add_city": pickupDetails?.shippment_add_city,
    "pickup_add_zipcode": pickupDetails?.shippment_add_zipcode,
    "pickup_add_longitude": pickupDetails?.shippment_add_longitude,
    "pickup_add_latitude": pickupDetails?.shippment_add_latitude,
    "pickup_add_type": "PICKUP",
    "pickup_add_other_info":pickupDetails?.shippment_add_other_info,
  }
  return obj
}
