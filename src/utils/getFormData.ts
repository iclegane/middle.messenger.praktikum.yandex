type TFormData = Record<string, FormDataEntryValue | File>;

export function getFormData(form : HTMLFormElement): TFormData {
    const formData = new FormData(form)

    const data: TFormData = {};
    const entries = formData.entries();
    Array.from(entries).forEach(([key, val]) => {
        data[key] = val
    })

    return data;
}