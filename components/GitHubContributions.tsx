import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type ContributionDay = {
  date: string;
  count: number;
}

type WeekData = {
  contributionDays: ContributionDay[];
}

type ContributionsData = {
  weeks: WeekData[];
  totalContributions: number;
}

type ContributionLevel = '0' | '1' | '2' | '3' | '4';

const contributionLevels: Record<ContributionLevel, string> = {
  '0': 'bg-gray-100',
  '1': 'bg-green-100',
  '2': 'bg-green-300',
  '3': 'bg-green-500',
  '4': 'bg-green-700'
};

function getContributionLevel(count: number): ContributionLevel {
  if (count === 0) return '0';
  if (count <= 3) return '1';
  if (count <= 6) return '2';
  if (count <= 9) return '3';
  return '4';
}

const GitHubContributions = () => {
  const [contributions, setContributions] = useState<ContributionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch('/api/github-contributions');
        if (!response.ok) throw new Error('Failed to fetch contributions');
        const data = await response.json();
        setContributions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch contributions');
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  if (loading) return <div className="text-center p-4">Loading contributions...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (!contributions) return null;

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="text-center">
        <div className="flex flex-col items-center gap-4">
          <CardTitle className="text-2xl font-bold">
            GitHub Contributions
          </CardTitle>
          <div className="text-sm text-gray-600">
            {contributions.totalContributions} contributions in {new Date().getFullYear()}
          </div>
          <Button 
            className="bg-[#24292e] hover:bg-[#1b1f23] text-white flex items-center gap-2"
            onClick={() => window.open('https://github.com/Sidharth004', '_blank')}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View GitHub Profile
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* Months header */}
          <div className="flex">
            <div className="w-8" />
            <div className="flex flex-1 justify-between text-sm text-gray-600">
              {months.map(month => (
                <div key={month} className="w-8 text-center">{month}</div>
              ))}
            </div>
          </div>

          {/* Contribution grid */}
          <div className="flex">
            {/* Days of week */}
            <div className="flex flex-col gap-2 text-sm text-gray-600 pr-2">
              <div>Mon</div>
              <div>Wed</div>
              <div>Fri</div>
            </div>

            {/* Contribution cells */}
            <div className="flex flex-1 gap-1">
              {contributions.weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.contributionDays.map((day, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`w-4 h-4 rounded-sm ${
                        contributionLevels[getContributionLevel(day.count)]
                      }`}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 text-sm text-gray-600 justify-end mt-4">
            <span>Less</span>
            {(Object.keys(contributionLevels) as ContributionLevel[]).map((level) => (
              <div
                key={level}
                className={`w-4 h-4 rounded-sm ${contributionLevels[level]}`}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GitHubContributions; 