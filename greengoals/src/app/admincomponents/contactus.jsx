import React, { useState, useEffect } from "react";

export const ContactUsDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState({});

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/admin/contactus");
      if (!response.ok) throw new Error("Failed to fetch contacts");
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/admin/contactus/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Failed to update status");
      fetchContacts();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const handleResponse = async (id, response, email) => {
    setSending((prev) => ({ ...prev, [id]: true }));
    try {
      const res = await fetch(`/api/admin/contactus/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response, email }),
      });

      if (!res.ok) throw new Error("Failed to send response");
      const result = await res.json();
      console.log(result); // Log the result for debugging
      fetchContacts();
    } catch (error) {
      console.error("Error sending response:", error);
    } finally {
      setSending((prev) => ({ ...prev, [id]: false }));
    }
  };

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {contacts.map((contact) => (
        <div key={contact._id} className="border rounded p-4 shadow-md">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">{contact.subject}</h3>
            <p className="text-sm text-gray-500">
              {new Date(contact.date).toLocaleString()}
            </p>
          </div>
          <div className="mb-4">
            <p>
              <strong>الاسم:</strong> {contact.name}
            </p>
            <p>
              <strong>البريد الإلكتروني:</strong> {contact.email}
            </p>
            <p>
              <strong>الرسالة:</strong> {contact.message}
            </p>
            <select
              value={contact.status}
              onChange={(e) => handleStatusChange(contact._id, e.target.value)}
              className="mt-2 p-2 border rounded"
            >
              <option value="new">جديد</option>
              <option value="in-progress">قيد المعالجة</option>
              <option value="resolved">تم الحل</option>
            </select>
          </div>
          <div className="flex flex-col items-stretch">
            <input
              id={`response-${contact._id}`}
              placeholder="اكتب ردك هنا"
              className="mb-2 p-2 border rounded"
            />
            <button
              onClick={() => {
                const response = document.querySelector(
                  `#response-${contact._id}`
                ).value;
                handleResponse(contact._id, response, contact.email);
                document.querySelector(`#response-${contact._id}`).value = "";
              }}
              disabled={sending[contact._id]}
              className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
            >
              {sending[contact._id] ? "جاري الإرسال..." : "إرسال الرد"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
