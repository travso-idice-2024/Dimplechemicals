import React, { useState,useEffect } from "react";
import useGmailAuth from "../../components/hooks/useGmailAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faStar,
  faClock,
  faPaperPlane,
  faFileAlt,
  faChevronDown,
  faTag,
  faComment,
  faCalendarAlt,
  faFolderOpen,
  faTrash,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import ComposeEmail from "./ComposeEmail";
import Inbox from "./Inbox";
import CreateLabelForm from "./CreateLabelForm";

const Gmail = () => {
  const { isAuthenticated, signIn, signOut, userProfile, accessToken,fetchInboxMessages ,labels,
    fetchLabels,createLabel,getMessageDetail} =
    useGmailAuth();

 useEffect(() => {
    if (isAuthenticated && accessToken) {
      fetchLabels(accessToken);
    }
  }, [isAuthenticated, accessToken]);

  const [showCompose, setShowCompose] = useState(false);
  const [activeView, setActiveView] = useState("Inbox"); // 📌 default open
  

 const renderActiveView = () => {
  switch (activeView) {
    case "Inbox":
      return <Inbox accessToken={accessToken} fetchInboxMessages={fetchInboxMessages} />;
    case "Starred":
      return <div>⭐ Starred Mails coming soon</div>;
    case "Sent":
      return <div>📤 Sent Mails coming soon</div>;
    default:
      return <Inbox
        accessToken={accessToken}
        fetchInboxMessages={fetchInboxMessages}
        labelName={activeView}
        getMessageDetail={getMessageDetail}
      />;
  }
};


  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      {isAuthenticated && (
        <aside className="w-64 bg-gray-100 border-r border-gray-300 p-4 space-y-3">
          <button
            onClick={() => setShowCompose(true)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700 mb-4"
          >
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            Compose
          </button>

          <div className="space-y-3">
            <MenuItem
        icon={faInbox}
        label="Inbox"
        labelId={labels.find((l) => l.name === "INBOX")?.id}
        activeView={activeView}
        setActiveView={setActiveView}
        
      />
      <MenuItem
        icon={faStar}
        label="Starred"
        labelId={labels.find((l) => l.name === "STARRED")?.id}
        activeView={activeView}
        setActiveView={setActiveView}
        
      />
      <MenuItem
        icon={faPaperPlane}
        label="Sent"
        labelId={labels.find((l) => l.name === "SENT")?.id}
        activeView={activeView}
        setActiveView={setActiveView}
        
      />
            <div className="pt-4 border-t border-gray-300">
              <CreateLabelForm createLabel={createLabel} />
  <h4 className="text-gray-600 text-xs uppercase mb-2">Labels</h4>
   {labels
      .filter(
        (label) =>
          ![
            "INBOX",
            "STARRED",
            "SENT",
            "DRAFT",
            "TRASH",
            "IMPORTANT",
            "CATEGORY_PERSONAL",
          ].includes(label.name)
      )
      .map((label) => (
        <MenuItem
          key={label.id}
          icon={faFolderOpen}
          label={label.name}
          labelId={label.id}
          activeView={activeView}
          setActiveView={setActiveView}
         
        />
      ))}
</div>

          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {isAuthenticated ? (
          <>
            {/* User Topbar */}
            <div className="flex items-start md:items-center flex-col md:flex-row md:justify-between mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={userProfile.getImageUrl()}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {userProfile.getName()}
                  </h3>
                  <p className="text-gray-600 text-sm text-white">
                    {userProfile.getEmail()}
                  </p>
                </div>
              </div>
              <button
                onClick={signOut}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>

            {/* Render active view */}
            {renderActiveView()}
          </>
        ) : (
          <div className="text-center mt-32">
            <h2 className="text-3xl font-bold mb-6 text-white">📧 Gmail Integration</h2>
            <button
              onClick={signIn}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
            >
              Login with Gmail
            </button>
          </div>
        )}
      </main>

      {/* Compose Email Modal */}
      {showCompose && (
        <ComposeEmail
          accessToken={accessToken}
          onClose={() => setShowCompose(false)}
        />
      )}
    </div>
  );
};

const MenuItem = ({ icon, label, labelId, activeView, setActiveView}) => (
  <div
    onClick={() => setActiveView(labelId )
    }
    className={`flex items-center space-x-3 text-gray-700 hover:bg-gray-200 p-2 rounded-lg cursor-pointer transition ${
      activeView === labelId  ? "bg-blue-100 font-semibold" : ""
    }`}
  >
    <FontAwesomeIcon icon={icon} className="w-4 h-4" />
    <span className="text-sm">{label}</span>
  </div>
);


export default Gmail;
