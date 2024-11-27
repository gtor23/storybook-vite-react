export default function TestButton(
    {
        label= 'Click Me'
    }
) {
    return (
        <button type='button' >
            {label}
        </button>
    )
}