import type { Metadata } from 'next';
import SiteReportView from './SiteReportView';

export const metadata: Metadata = {
  title: 'SiteReport AI | Threshold Technologies',
  description:
    'SiteReport AI turns a site walk into a finished, dated, professional site report — daily logs, inspections, progress and snags, ready before you leave site. A DiSam system by Threshold Technologies.',
  openGraph: {
    title: 'SiteReport AI | Threshold Technologies',
    description: 'Walk the site. The report writes itself.',
    type: 'website',
  },
};

export default function Page() {
  return (
    <main>
      <SiteReportView />
    </main>
  );
}
