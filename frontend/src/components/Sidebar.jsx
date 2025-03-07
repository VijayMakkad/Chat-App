import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, UserPlus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { isUserLoading, getUsers, users, selectedUser, setSelectedUser } =
    useChatStore();
  const navigate = useNavigate();
  const { authUser, onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUserLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-base-300 flex flex-col transition-all duration-300 bg-base-100 shadow-sm">
      {/* Header */}
      <div className="border-b border-base-300 w-full p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Users className="size-5 text-primary" />
            </div>
            <span className="font-semibold text-base hidden lg:block">
              Contacts
            </span>
          </div>
          {/* <button className="p-2 rounded-lg hover:bg-base-200 transition-colors hidden lg:flex">
            <UserPlus className="size-5 text-base-content/70" />
          </button> */}
        </div>
      </div>

      {/* Search
      <div className="px-3 py-3 border-b border-base-300 hidden lg:block">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search contacts..." 
            className="input input-sm input-bordered w-full pl-9 bg-base-200/70"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-base-content/50" />
        </div>
      </div> */}

      {/* Online Indicator */}
      <div className="px-4 pt-4 pb-2 hidden lg:block">
        <div className="flex items-center gap-2">
          <div className="size-2 bg-green-500 rounded-full"></div>
          <span className="text-xs font-medium text-base-content/70">
            {onlineUsers.length} online
          </span>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto flex-1 w-full py-2 px-1">
        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-base-content/50 py-8">
            <Users className="size-12 mb-2 opacity-20" />
            <p className="text-sm">No contacts yet</p>
          </div>
        ) : (
          users.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-2 lg:p-3 flex items-center gap-3 hover:bg-base-200 rounded-lg transition-all my-1
                ${
                  selectedUser?._id === user._id
                    ? "bg-base-200 shadow-sm border-l-4 border-primary"
                    : "border-l-4 border-transparent"
                }`}
            >
              <div className="relative mx-auto lg:mx-0">
                <div className="size-12 relative overflow-hidden rounded-full bg-base-300">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                    className="size-12 object-cover rounded-full hover:scale-110 transition-transform duration-300"
                  />
                </div>
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-100" />
                )}
              </div>

              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-xs flex items-center gap-1 mt-0.5">
                  {onlineUsers.includes(user._id) ? (
                    <>
                      <span className="size-1.5 bg-green-500 rounded-full"></span>
                      <span className="text-green-500">Online</span>
                    </>
                  ) : (
                    <span className="text-base-content/50">Offline</span>
                  )}
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {/* User Account */}
      <div className="mt-auto border-t border-base-300 p-3 hidden lg:block">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-base-300 overflow-hidden">
            <img
              src={authUser.profilePic || "/avatar.png"}
              alt={authUser.fullName}
              className="size-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="font-medium truncate">Your Account</div>
            <div className="text-xs text-base-content/60">
              <button
                onClick={() => navigate("/profile")}
                className="hover:text-primary transition-colors"
              >
                View profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
