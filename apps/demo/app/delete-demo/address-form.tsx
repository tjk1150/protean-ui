export function AddressForm() {
  return (
    <form className="address-form" onSubmit={(event) => event.preventDefault()}>
      <label>
        Recipient
        <input name="recipient" placeholder="Jane Doe" />
      </label>
      <label>
        Address
        <input name="address" placeholder="1 Example Street" />
      </label>
      <label>
        Delivery note
        <input name="note" placeholder="Leave at the door" />
      </label>
      <button type="submit" className="button primary">
        Save address
      </button>
    </form>
  )
}
