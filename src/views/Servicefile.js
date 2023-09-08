import { Steps, Button, Notification, toast } from 'components/ui'
export default function GetDropdownLabel(selectedKey, dropdowns) {
    return dropdowns
        ?.filter((e) => e?.value === selectedKey)
        .map((n) => n?.label)
}

export function GetErrorMsg(resp) {
    if (resp?.message?.error?.validation_errors != null) {
        return resp?.message?.error?.validation_errors?.map(
            (item) => item.error_message
        )
    } else {
        return resp?.message?.error?.error_msg
    }
}

export const OpenNotification = (type, textTitle, setSubmitting) => {
    toast.push(
        <Notification
            title={type.charAt(0).toUpperCase() + type.slice(1)}
            type={type}
            duration={2000}
        >
            {textTitle}
        </Notification>
    )
    // setSubmitting(false)
}

export const validateURL = (value) => {
    let errorMessage

    if (value) {
        const urlPattern =
            /^(http[s]?:\/\/)?(www\.)?([^\s.]+\.[^\s]{2,}|localhost)(\/[^\s]*)?$/
        if (!urlPattern.test(value)) {
            errorMessage = 'Invalid URL format'
        }
    }

    return errorMessage
}

export const snakeToCamel = (key) => {
    return key.replace(/(_\w)/g, function (match) {
        return match[1].toUpperCase()
    })
}
