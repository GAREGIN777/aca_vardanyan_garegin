export default function UserModel(user) {
    if (!user) {
        return;
    }

    const { UserId, Name,RelatedInvoices } = user;

    this.getUserId = () => {
        return UserId;
    };

    this.getName = () => {
        return Name;
    };

    this.getInvoices = () => {
        return RelatedInvoices;
    }
}