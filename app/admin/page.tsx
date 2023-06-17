import CategorieSection from "@/components/admin/CategorieSection";
import SiteSection from "@/components/admin/SiteSection";
import ThemeSection from "@/components/admin/ThemeSection";

export default function AdminPage(){
    return <>
        <CategorieSection/>
        <ThemeSection/>
        <SiteSection/>
    </>
}