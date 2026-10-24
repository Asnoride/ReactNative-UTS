import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface InfoCardProps {
  title: string;
  status: 'selesai' | 'proses' | string;
  description?: string;
  onPress?: () => void;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  status,
  description = 'No additional information provided for this milestone.',
  onPress,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isCompleted = status.toLowerCase() === 'selesai';

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
    if (onPress) {
      onPress();
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View style={styles.titleWrapper}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>
            {isCompleted ? 'Verification Complete' : 'In Active Progress'}
          </Text>
        </View>

        <View
          style={[
            styles.badge,
            isCompleted ? styles.badgeSuccess : styles.badgePending,
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              isCompleted ? styles.badgeTextSuccess : styles.badgeTextPending,
            ]}
          >
            {status}
          </Text>
        </View>
      </View>

      {isExpanded && (
        <View style={styles.expandedContent}>
          <View style={styles.contentDivider} />
          <Text style={styles.contentLabel}>Milestone Details</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.actionButton, isExpanded && styles.actionButtonActive]}
        onPress={handleToggle}
        activeOpacity={0.75}
      >
        <Text style={styles.actionButtonText}>
          {isExpanded ? 'Lihat Detail (Close)' : 'Lihat Detail'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleWrapper: {
    flex: 1,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 22,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  badgeSuccess: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  badgePending: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  badgeTextSuccess: {
    color: '#059669',
  },
  badgeTextPending: {
    color: '#D97706',
  },
  expandedContent: {
    marginTop: 12,
  },
  contentDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: 12,
  },
  contentLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 20,
  },
  actionButton: {
    marginTop: 14,
    backgroundColor: '#0F172A',
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonActive: {
    backgroundColor: '#334155',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});

export default InfoCard;