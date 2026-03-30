import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from '../pages/SplashScreen';
import LoginScreen from '../pages/LoginScreen';
import PhoneInputPage from '../pages/PhoneInputPage';
import VerifyOTPPage from '../pages/VerifyOTPPage';
import ProfileDetailsPage from '../pages/ProfileDetailsPage';
import GenderSelectionPage from '../pages/GenderSelectionPage';
import AddPhotosPage from '../pages/AddPhotosPage';
import EnableLocationPage from '../pages/EnableLocationPage';
import InterestsPage from '../pages/InterestsPage';
import RelationshipGoalsPage from '../pages/RelationshipGoalsPage';
import ProfilePreviewPage from '../pages/ProfilePreviewPage';
import DiscoveryPage from '../pages/DiscoveryPage';
import ProfileDetailPage from '../pages/ProfileDetailPage';
import EditProfilePage from '../pages/EditProfilePage';
import PremiumPage from '../pages/PremiumPage';
import ChatListPage from '../pages/ChatListPage';
import ChatScreenPage from '../pages/ChatScreenPage';
import LikesYouPage from '../pages/LikesYouPage';
import SettingsPage from '../pages/SettingsPage';
import MeasurementUnitsPage from '../pages/MeasurementUnitsPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsOfServicePage from '../pages/TermsOfServicePage';
import AdminLoginPage from '../../admin/pages/AdminLoginPage';
import AdminLayout from '../../admin/components/AdminLayout';
import DashboardPage from '../../admin/pages/DashboardPage';
import ModerationPage from '../../admin/pages/ModerationPage';
import UsersPage from '../../admin/pages/UsersPage';
import SubscriptionsPage from '../../admin/pages/SubscriptionsPage';
import QueueManagementPage from '../../admin/pages/QueueManagementPage';
import TransactionsPage from '../../admin/pages/TransactionsPage';
import ReportsPage from '../../admin/pages/ReportsPage';
import NotificationsPage from '../../admin/pages/NotificationsPage';
import AppConfigPage from '../../admin/pages/AppConfigPage';
import AdminProfilePage from '../../admin/pages/AdminProfilePage';
import AdminSettingsPage from '../../admin/pages/AdminSettingsPage';
import WebsitePageEditorPage from '../../admin/pages/WebsitePageEditorPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/phone-input" element={<PhoneInputPage />} />
            <Route path="/verify" element={<VerifyOTPPage />} />
            <Route path="/profile-details" element={<ProfileDetailsPage />} />
            <Route path="/gender-select" element={<GenderSelectionPage />} />
            <Route path="/add-photos" element={<AddPhotosPage />} />
            <Route path="/enable-location" element={<EnableLocationPage />} />
            <Route path="/interests" element={<InterestsPage />} />
            <Route path="/relationship-goals" element={<RelationshipGoalsPage />} />
            <Route path="/profile" element={<ProfilePreviewPage />} />
            <Route path="/profile-preview" element={<ProfilePreviewPage />} />
            <Route path="/discovery" element={<DiscoveryPage />} />
            <Route path="/profile-detail" element={<ProfileDetailPage />} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/chats" element={<ChatListPage />} />
            <Route path="/chat" element={<ChatScreenPage />} />
            <Route path="/likes" element={<LikesYouPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/measurement-units" element={<MeasurementUnitsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="moderation" element={<ModerationPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="subscriptions" element={<SubscriptionsPage />} />
                <Route path="queue-management" element={<QueueManagementPage />} />
                <Route path="transactions" element={<TransactionsPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="app-config" element={<AppConfigPage />} />
                <Route path="website-pages/:slug" element={<WebsitePageEditorPage />} />
                <Route path="profile" element={<AdminProfilePage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
