import { AdSlot } from '@/components/GoogleAdsense'
import OrangeCat from './OrangeCat'
import Announcement from './Announcement'
import Catalog from './Catalog'
import WWAds from '@/components/WWAds'

export default function SideBar (props) {
  const { notice } = props
  return (<>
            <Catalog {...props} />
            <OrangeCat />
            <Announcement post={notice} />
            <AdSlot/>
            <WWAds orientation="vertical" className="w-full" />
    </>)
}
