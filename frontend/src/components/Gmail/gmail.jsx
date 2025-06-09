import React, { useState, useEffect } from "react";
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
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import ComposeEmail from "./ComposeEmail";
import Inbox from "./Inbox";
import CreateLabelForm from "./CreateLabelForm";
import LabelEmailForm from "./LabelEmailForm";
import ContentTop from "../ContentTop/ContentTop"

const Gmail = () => {
  const {
    isAuthenticated,
    signIn,
    signOut,
    userProfile,
    accessToken,
    fetchInboxMessages,
    labels,
    fetchLabels,
    createLabel,
    getMessageDetail,
    getMessagesBySender,
    applyLabelToMessage,
    handleRemoveLabel,
  } = useGmailAuth();

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      fetchLabels(accessToken);
    }
  }, [isAuthenticated, accessToken]);

  const [showCompose, setShowCompose] = useState(false);
  const [activeView, setActiveView] = useState("INBOX"); // 📌 default open

  // Same system labels list you have in sidebar
  const systemLabels = ["INBOX", "STARRED", "SNOOZED", "SENT", "DRAFT"];

  // Map of system label names to their IDs
  const labelIdMap = labels.reduce((acc, label) => {
    if (systemLabels.includes(label.name)) {
      acc[label.name] = label.id;
    }
    return acc;
  }, {});

  const renderActiveView = () => {
    switch (activeView) {
      case labelIdMap.INBOX:
        return (
          <Inbox
            accessToken={accessToken}
            fetchInboxMessages={fetchInboxMessages}
            labelName={activeView}
            getMessageDetail={getMessageDetail}
          />
        );
      case labelIdMap.STARRED:
        return <div>⭐ Starred Mails coming soon</div>;
      case labelIdMap.SNOOZED:
        return <div>⏰ Snoozed Mails coming soon</div>;
      case labelIdMap.SENT:
        return <div>📤 Sent Mails coming soon</div>;
      case labelIdMap.DRAFT:
        return <div>📝 Draft Mails coming soon</div>;
      default:
        return (
          <Inbox
            accessToken={accessToken}
            fetchInboxMessages={fetchInboxMessages}
            labelName={activeView}
            getMessageDetail={getMessageDetail}
          />
        );
    }
  };

  const handleAssignLabelToEmail = async (email, labelId) => {
    try {
      const messages = await getMessagesBySender(accessToken, email);
      if (messages?.length === 0) {
        alert("No emails found from this sender.");
        return;
      }

      await Promise.all(
        messages?.map((msg) =>
          applyLabelToMessage(accessToken, msg?.id, labelId)
        )
      );

      alert(`Assigned label to ${messages?.length} messages from ${email}`);
    } catch (error) {
      console.error("Failed to assign label:", error);
      alert("Error assigning label. Check console.");
    }
  };

  const [showConfirm, setShowConfirm] = useState(false);
  const [labelToDelete, setLabelToDelete] = useState(null);

  return (
     <div className="main-content">
      <ContentTop />
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
              <CreateLabelForm createLabel={createLabel} labels={labels} />
              <h4 className="text-gray-600 text-xs uppercase mb-2">Labels</h4>
              {labels
                .filter(
                  (label) =>
                    ![
                      "INBOX",
                      "STARRED",
                      "SNOOZED",
                      "SENT",
                      "DRAFT",
                      "TRASH",
                      "IMPORTANT",
                      "CATEGORY_PERSONAL",
                      "CATEGORY_SOCIAL",
                      "CATEGORY_PROMOTIONS",
                      "CATEGORY_UPDATES",
                      "CATEGORY_FORUMS",
                      "SPAM",
                      "CHAT",
                      "UNREAD",
                    ].includes(label.name)
                )
                .map((label) => (
                  // <MenuItem
                  //   key={label.id}
                  //   icon={faFolderOpen}
                  //   label={label.name}
                  //   labelId={label.id}
                  //   activeView={activeView}
                  //   setActiveView={setActiveView}
                  //   onRemoveLabel={() => handleRemoveLabel(label.id)}
                  // />
                  <div
                    key={label.id}
                    className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer"
                    onClick={() => {
                      setActiveView(label.id);
                    }}
                  >
                    <div className="flex items-center">
                      <FontAwesomeIcon
                        icon={faFolderOpen}
                        className="mr-2 text-gray-600"
                      />
                      <span>{label.name}</span>
                    </div>
                    <FontAwesomeIcon
                      icon={faTimes}
                      onClick={(e) => {
                        e.stopPropagation(); // prevents triggering the parent div's onClick
                        setLabelToDelete(label);
                        setShowConfirm(true);
                      }}
                      className="text-red-500 cursor-pointer hover:text-red-600"
                    />
                  </div>
                ))}
            </div>
          </div>
        </aside>
      )}

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Remove label</h2>
            <p className="mb-6">
              Delete the label{" "}
              <span className="font-medium">"{labelToDelete.name}"</span>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleRemoveLabel(labelToDelete.id);
                  setShowConfirm(false);
                }}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {isAuthenticated ? (
          <>
            {/* User Topbar */}
            <div className="flex items-start md:items-center flex-col md:flex-row md:justify-between gap-[8px] md:gap-[0px]  mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={userProfile?.picture}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {userProfile?.name}
                  </h3>
                  <p className="text-gray-600 text-sm text-white">
                    {userProfile?.email}
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
            <LabelEmailForm
              labels={labels}
              onAssignLabel={handleAssignLabelToEmail}
            />
            {/* Render active view */}
            {renderActiveView()}
          </>
        ) : (
          <div className="text-center mt-32">
            <h2 className="text-2xl font-bold mb-6 text-white">
              📧 Gmail Integration
            </h2>
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
    </div>
  );
};

const MenuItem = ({ icon, label, labelId, activeView, setActiveView }) => (
  <div
    onClick={() => setActiveView(labelId)}
    className={`flex items-center space-x-3 text-gray-700 hover:bg-gray-200 p-2 rounded-lg cursor-pointer transition ${
      activeView === labelId ? "bg-blue-100 font-semibold" : ""
    }`}
  >
    <FontAwesomeIcon icon={icon} className="w-4 h-4" />
    <span className="text-sm">{label}</span>
  </div>
);

export default Gmail;
